terraform {
  backend "s3" {
    bucket         = "km-tf-state"
    dynamodb_table = "terraformLock"
    key            = "km-web"
    region         = "us-east-1"
  }
}


locals {
  env      = "${terraform.workspace == "default" ? "dev" : terraform.workspace}"
  app_name = "Know Me Web App - ${local.env}"
  domain   = "${local.env == "production" ? "app.knowmetools.com" : "${local.env}.app.knowmetools.com"}"
  # Production deployments cached for 1 day, all others for 5 minutes.
  ttl      = "${local.env == "production" ? 86400 : 300}"
}


provider "aws" {
  region = "${var.aws_region}"
}


data "aws_acm_certificate" "ssl" {
  domain = "*.app.knowmetools.com"
}

data "aws_route53_zone" "main" {
  name = "knowmetools.com"
}


resource "aws_s3_bucket" "site" {
  acl           = "public-read"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags {
    Application = "${local.app_name}"
    Name        = "App Static Bucket"
  }
}

resource "aws_s3_bucket_policy" "site_policy" {
  bucket = "${aws_s3_bucket.site.id}"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "${aws_s3_bucket.site.id}-policy",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::${aws_s3_bucket.site.id}/*"]
    }
  ]
}
POLICY
}

resource "aws_cloudfront_distribution" "main" {
  aliases             = ["${local.domain}"]
  comment             = "CDN for ${local.app_name}"
  default_root_object = "index.html"
  enabled             = true
  price_class         = "PriceClass_100"

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    compress               = true
    default_ttl            = "${local.ttl}"
    max_ttl                = "${local.ttl}"
    min_ttl                = 0
    target_origin_id       = "S3"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  origin {
    domain_name = "${aws_s3_bucket.site.bucket_domain_name}"
    origin_id   = "S3"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags {
    Application = "${local.app_name}"
    Name        = "App CDN"
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.ssl.arn}"
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "app" {
  name    = "${local.domain}"
  type    = "A"
  zone_id = "${data.aws_route53_zone.main.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.main.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.main.hosted_zone_id}"
  }
}
