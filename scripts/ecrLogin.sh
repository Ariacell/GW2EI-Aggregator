#!/bin/bash

ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.ap-southeast-2.amazonaws.com"