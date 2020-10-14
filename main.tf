provider "aws" {
  access_key = ""
  secret_key = ""
  region = "us-east-2"
}

variable "bucket_name" {
  default = "zmartin-cyderes-skills-challenge"
}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.bucket_name}"
  acl = "public-read"

  policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.bucket_name}/*",
      "Principal": "*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

output "website_domain" {
  value = "${aws_s3_bucket.s3_bucket.website_domain}"
}

output "website_endpoint" {
  value = "${aws_s3_bucket.s3_bucket.website_endpoint}"
}