resource "aws_lambda_function" "uploader_lambda" {
  function_name    = "gw2-aggregator-uploader"
  handler          = "handler"
  filename         = "${path.root}/uploadHandler.zip"
  source_code_hash = filemd5(data.archive_file.uploader_lambda.output_path)
  role             = aws_iam_role.uploader_lambda.arn
  runtime          = "nodejs18.x"

  environment {
    variables = {
      UPLOAD_BUCKET_ID                 = aws_s3_bucket.zipped_logs_s3_bucket.id
      UPLOAD_URL_EXPIRATION_IN_SECONDS = 300
    }
  }
}

resource "aws_iam_role" "uploader_lambda" {
  name = "gw2_aggregator_uploader_lambda"

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

resource "aws_iam_role_policy_attachment" "uploader_lambda" {
  role       = aws_iam_role.uploader_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


data "archive_file" "uploader_lambda" {
  type = "zip"

  source_file = "${path.root}/../packages/lambda/build/uploadHandler.js"
  output_path = "${path.root}/uploadHandler.zip"
}

resource "aws_cloudwatch_log_group" "uploader_lambda" {
  name = "/aws/lambda/${aws_lambda_function.uploader_lambda.function_name}"

  retention_in_days = 30
}


