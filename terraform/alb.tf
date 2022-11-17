


resource "aws_lb" "aggregator_lb" {
  name                             = "gw2-aggregator-alb"
  internal                         = false
  load_balancer_type               = "application"
  security_groups                  = [aws_security_group.allow_http_and_https.id]
  subnets                          = [aws_subnet.public_a.id, aws_subnet.public_b.id]
  enable_cross_zone_load_balancing = "true"
}

resource "aws_lb_listener" "aggregator_lb_listener" {
  load_balancer_arn = aws_lb.aggregator_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.aggregator_tg.arn
  }
}

resource "aws_security_group" "allow_http_and_https" {
  name        = "allow_ingress"
  description = "Allow UDP and TLS inbound traffic"
  vpc_id      = aws_vpc.vpc_example_app.id

  ingress {
    description = "TLS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.vpc_example_app.cidr_block]
  }

  ingress {
    description = "UDP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}
