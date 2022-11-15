#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
REPO_NAME=gw2_express_static_aggregator
REPO_URL=$ACCOUNT_ID.dkr.ecr.ap-southeast-2.amazonaws.com/$REPO_NAME


$SCRIPT_DIR/ecrLogin.sh

docker build -t $REPO_NAME $SCRIPT_DIR/../.
docker tag $REPO_NAME:latest $REPO_URL:latest
docker push $REPO_URL:latest