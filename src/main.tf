provider "aws" {
  access_key = "AKIA5B5DC5I3T4JECM6F"
  secret_key = "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"
  region = "us-east-2"
}

variable "root_domain_name" {
  default = ""
}

variable "application_domain" {
  default = ""
}

variable "bucket_name" {
  default = "zmartin-cyderes-skills-challenge"
}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [{
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*"
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::${var.bucket_name}/*",
    }]
}
POLICY

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