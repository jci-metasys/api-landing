#!/bin/bash
set -x
USER=$1
TOKEN=$2
ORG=$3
REPO=$4
PR=$5
JOB_ID=$6

# Notes on the jq
# .[] - Iterate thru the array
# select(.body | contains()) - Select an object if it has a body that contains "Circle CI Preview Available"
# This streams 0 or more objects but not witin an array. The next step will turn it back into an array

# jq -r -s - This invocation of jq uses -s which "slurps" in the stream turning it back into an array
#            The -r says to output raw strings, so if we find a url it'll not have double quotes around it
# first - This says grab the first element of the array (if there is one)
# .url  - This says grab the url from the object (if there is one)
# The output of this if there is no matching element is the raw string null (not an actual null value which is confusing)

# preview_comment_url=$(curl --location "https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments" \
#             -u "$USER:$TOKEN" | jq  '.[] | {body: .body, url: .url} | select(.body | contains("Circle CI Preview Available"))' | jq -r -s '. | first | .url')
preview_comment_url=$(curl --location "https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments" \
            -u "$USER:$TOKEN" | jq  '.[] | select(.body | contains("Circle CI Preview"))' | jq -r -s '. | first | .url')

preview_comment="Circle CI Preview [Available](https://output.circle-artifacts.com/output/job/${JOB_ID}/artifacts/0/site-preview/index.html)"
comment_body="{\"body\": \"$preview_comment\"}"

echo $comment_body

if [[ $preview_comment_url != "null" ]]
then
    # we have an existing comment we want to update
    echo "Updating $preview_comment_url"
    curl \
    -X PATCH \
    -H "Accept: application/vnd.github+json" \
    -u "$USER:$TOKEN" \
    $preview_comment_url \
    -d "$comment_body"

else
    # we don't have an existing comment, we need to create one
    echo "Creating new comment"
    curl \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -u "$USER:$TOKEN" \
    https://api.github.com/repos/$ORG/$REPO/issues/$PR/comments \
    -d "$comment_body"
fi

set +x
