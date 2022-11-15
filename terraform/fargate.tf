data "aws_caller_identity" "current" {}

resource "aws_ecs_task_definition" "backend_task" {
    family = var.service_family_name

    // Fargate is a type of ECS that requires awsvpc network_mode
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"

    // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
    memory = "512"
    cpu = "256"

    // Fargate requires task definitions to have an execution role ARN to support ECR images
    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

    container_definitions = <<EOT
[
    {
        "name": "${var.service_family_name}",
        "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.ap-southeast-2.amazonaws.com/${var.service_family_name}:latest",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": 5000,
                "hostPort": 5000
            }
        ]
    }
]
EOT
}

resource "aws_ecs_cluster" "backend_cluster" {
    name = var.service_family_name
}

resource "aws_ecs_service" "backend_service" {
    name = var.service_family_name

    cluster = "${aws_ecs_cluster.backend_cluster.id}"
    task_definition = "${aws_ecs_task_definition.backend_task.arn}"

    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
        subnets = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
        security_groups = ["${aws_security_group.security_group_example_app.id}"]
        assign_public_ip = true
    }
}