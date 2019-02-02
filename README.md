# Know Me Web

![Travis CI Status](https://img.shields.io/travis/com/knowmetools/km-web.svg?style=flat)

This is Know Me's web app. It provides account functionality such as email verification and password resets for the Know Me iOS app.


## Deployment

### Deploying to the Internet

The app is hosted on S3 and distributed through CloudFront. There is a script to facilitate the deployment to these platforms. Simply call it with the version of the application you want to deploy checked out.

```shell
$ git checkout v1.2.3
$ cd deploy
$ ./deploy.sh terraform/ default
```

The `deploy.sh` script takes two parameters. The first is the relative path from the current directory to the directory containing our Terraform configuration. The second parameter is the name of the Terraform workspace containing the infrastructure that we want to deploy to.

#### Environment Variables

The following environment variables can be used to configure the build.

##### `REACT_APP_API_ROOT`

Default: `https://dev.toolbox.knowmetools.com`

The API root that the app makes calls to.

### Infrastructure

We use Terraform to provision the infrastructure that hosts the web app. The configuration for this is located in the `deploy/terraform` directory. To initialize the Terraform environment, ensure that you have AWS credentials accessible (environment variables, `~/.aws/credentials`, etc.) and run the following:

```shell
$ terraform init
```

Our infrastructure is split into multiple workspaces. The default workspace corresponds to the dev environment, and each additional workspace corresponds to `<workspace>.app.knowmetools.com`. The exception to this is the `production` workspace, which is available at the root `app.knowmetools.com`.

To provision a new set of infrastructure resources or modify an existing set, select the appropriate workspace and plan your changes.

```shell
$ terraform workspace select my-workspace
$ terraform plan -out tfplan
```

If (and only if) the changes output by `terraform plan` are acceptable, they can be applied.

```shell
$ terraform apply tfplan
```


## License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for more information.
