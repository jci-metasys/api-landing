#!/bin/bash
set -x
USER=$1
TOKEN=$2
ORG=$3
REPO=$4
PR=$5
JOB_ID=$6

pr_comments_response=$(curl --location "https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments" \
            -u "$USER:$TOKEN" | jq '.[] | {body: .body, url: .url} | select(.body | contains("Circle CI Preview Available"))')

echo $pr_comments_response
# echo $pr_comments_response

preview_comment="Circle CI Preview Available: https://output.circle-artifacts.com/output/job/${JOB_ID}/artifacts/0/site-preview/index.html"
comment_body="{\"body\": \"$preview_comment\"}"

echo $comment_body

curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -u "$USER:$TOKEN" \
 \
https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments \
-d "$comment_body"

set +x
