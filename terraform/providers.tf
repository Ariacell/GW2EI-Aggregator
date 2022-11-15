provider "aws" {
  region  = "ap-southeast-2"

  default_tags {
    tags = {
        CreatedBy="gw2-express-aggregator-tf"
    }
  }
}