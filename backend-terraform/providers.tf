provider "aws" {
  region = "ap-southeast-2"

  default_tags {
    tags = {
      CreatedBy = "gw2-aggregator-tf"
    }
  }
}

provider "aws" {
  # Needed for certificate provisioning
  alias  = "us-east-1"
  region = "us-east-1"

  default_tags {
    tags = {
      CreatedBy = "gw2-aggregator-tf"
    }
  }
}
