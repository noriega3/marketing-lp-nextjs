#!/bin/sh
set -e
input="/opt/app-root/src/assets/.env"
IFS='='
while read -r line || [ -n "$line" ];
do
    parts=($line)
    key=${parts[0]}
    value=$(echo "$line" | sed 's/^[^=]*= *//')
    replace="s/$key/$value/g"
    find /opt/app-root/src/. -type f \( -name '*.js' -o -name '*.html' \) -print0 -exec sed -i '' -e "$replace" {} +
done < "$input"