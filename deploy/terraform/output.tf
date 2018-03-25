output "bucket" {
  description = "The name of the S3 bucket that resources are served from."
  value       = "${aws_s3_bucket.site.id}"
}

output "domain" {
  description = "The domain name the provisioned infrastructure is available at."
  value       = "${local.domain}"
}
