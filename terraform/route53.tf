
data "aws_route53_zone" "chaotically_me_zone" {
  name         = "chaotically.me"
  private_zone = false
}


resource "aws_route53_record" "aggregator" {
  zone_id = data.aws_route53_zone.chaotically_me_zone.zone_id
  name    = "gw2-aggregator.chaotically.me"
  type    = "A"
  alias {
    name                   = aws_lb.aggregator_lb.dns_name
    zone_id                = aws_lb.aggregator_lb.zone_id
    evaluate_target_health = true
  }
}
