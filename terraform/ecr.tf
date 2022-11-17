resource "aws_ecr_repository" "ecr_repo" {
  name = var.service_family_name
}

data "aws_ecr_image" "service_image" {
  repository_name = var.service_family_name
  image_tag       = "latest"
}
