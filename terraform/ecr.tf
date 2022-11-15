resource "aws_ecr_repository" "ecr_repo" {
    name = var.service_family_name
}