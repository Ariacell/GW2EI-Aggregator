resource "aws_s3_bucket" "website_s3_bucket" {
  bucket = var.aggregator_subdomain
  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  force_destroy = true
}



resource "aws_s3_bucket" "aggregated_logs_s3_bucket" {
  bucket = "aggregated-${var.aggregator_subdomain}"

  force_destroy = true

}

resource "aws_s3_bucket" "zipped_logs_s3_bucket" {
  bucket        = "zipped-${var.aggregator_subdomain}"
  force_destroy = true
}
