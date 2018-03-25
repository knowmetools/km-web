#!/bin/bash

# Usage: deploy.sh <terraform_dir> <workspace>

set -euf
set -o pipefail

if [ -z ${1+x} ] || [ -z ${2+x} ]
then
    echo "Usage: deploy.sh <terraform-dir> <workspace>"
    echo "  Where <terraform-dir> is the relative path from the current working"
    echo "  directory to the directory containing the project's Terraform"
    echo "  configuration, and <workspace> is the name of the Terraform workspace"
    echo "  to operate in."

    exit 1
fi

TERRAFORM_DIR=$1
TERRAFORM_WORKSPACE=$2

echo -e "\nUsing Terraform configuration in $TERRAFORM_DIR"
echo "Selecting '$TERRAFORM_WORKSPACE' workspace"

BUCKET=$(
    cd $TERRAFORM_DIR \
    && terraform workspace select $TERRAFORM_WORKSPACE \
    && terraform output bucket
)

echo -e "\nFiles will be uploaded to s3://$BUCKET\n"


yarn build

aws s3 sync --delete build s3://$BUCKET
