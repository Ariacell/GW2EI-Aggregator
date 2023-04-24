resource "aws_lambda_function" "aggregator_lambda" {
  function_name    = "gw2-aggregator"
  handler          = "handler"
  filename         = "${path.root}/aggregatorHandler.zip"
  source_code_hash = filemd5(data.archive_file.aggregator_lambda.output_path)
  role             = aws_iam_role.aggregator_lambda.arn
  runtime          = "nodejs18.x"
}

resource "aws_iam_role" "aggregator_lambda" {
  name = "gw2-aggregator-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "aggregator_lambda" {
  role       = aws_iam_role.aggregator_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


data "archive_file" "aggregator_lambda" {
  type = "zip"

  source_file = "${path.root}/../packages/lambda/build/aggregatorHandler.js"
  output_path = "${path.root}/aggregatorHandler.zip"
}

resource "aws_cloudwatch_log_group" "aggregator_lambda" {
  name = "/aws/lambda/${aws_lambda_function.aggregator_lambda.function_name}"

  retention_in_days = 30
}


