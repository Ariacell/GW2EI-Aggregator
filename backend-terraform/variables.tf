variable "aws_default_region" {
  description = "Default region for AWS services"
  default     = "ap-southeast-2"
}

variable "root_domain_name" {
  default = "chaotically.me"
}

variable "aggregator_subdomain" {
  default = "gw2-aggregator.chaotically.me"
}

