#!/bin/bash
set -x
USER=$1
TOKEN=$2
ORG=$3
REPO=$4
PR=$5
JOB_ID=$6

preview_comment=$(curl --location "https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments" \
            -u "$USER:$TOKEN" | jq '.[] | {body: .body, url: .url} | select(.body | contains("Circle CI Preview Available"))' | jq -s '. | first | .url')

echo $preview_comment

preview_comment="Circle CI Preview Available: https://output.circle-artifacts.com/output/job/${JOB_ID}/artifacts/0/site-preview/index.html"
comment_body="{\"body\": \"$preview_comment\"}"

echo $comment_body

exit
if [[ -n $preview_comment ]]
then
    # we have an existing comment we want to update
    curl \
    -X PATCH \
    -H "Accept: application/vnd.github+json" \
    -u "$USER:$TOKEN" \
    $preview_comment \
    -d "$comment_body"
else
    # we don't have an existing comment, we need to create one
    curl \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -u "$USER:$TOKEN" \
    https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments \
    -d "$comment_body"
fi




set +x
