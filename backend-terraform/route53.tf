
data "aws_route53_zone" "chaotically_me_zone" {
  name         = var.root_domain_name
  private_zone = false
}


resource "aws_route53_record" "aggregator" {
  zone_id = data.aws_route53_zone.chaotically_me_zone.zone_id
  name    = var.aggregator_subdomain
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.frontend_cloudfront_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "chaotically_certificate" {
  provider          = aws.us-east-1
  domain_name       = var.aggregator_subdomain
  validation_method = "DNS"
}

resource "aws_route53_record" "chaotically_domain" {
  for_each = {
    for option in aws_acm_certificate.chaotically_certificate.domain_validation_options : option.domain_name => {
      name   = option.resource_record_name
      record = option.resource_record_value
      type   = option.resource_record_type
    }
  }

  allow_overwrite = true
  zone_id         = data.aws_route53_zone.chaotically_me_zone.zone_id
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
}

resource "aws_acm_certificate_validation" "chaotically_certificate_validation" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.chaotically_certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.chaotically_domain : record.fqdn]
}
