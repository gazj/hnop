#!/bin/sh
VERSION=$(awk -F'"' '/"version"/{print $4}' manifest.json)
PROJECT_DIR=$(git rev-parse --show-toplevel)
cd $PROJECT_DIR
zip -r bundles/bundle-${VERSION}-$(date +%s).zip . \
    -x *.DS_Store \
    -x *.git* \
    -x *images/screenshots/ \
    -x *images/screenshots/* \
    -x *bundles/ \
    -x *bundles/* \
    -x *.pxd \
    -x *.zip \
    -x LICENSE \
    -x README.md