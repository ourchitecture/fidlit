#!/bin/sh

source ./_utils.sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

checkToolSupported $tool

if [ x"${IN_CONTAINER}" == "x" ]; then
  checkContainersInstalled $tool

  tag_name="${TAG_NAME:-localhost/fidlit/node:latest}"

  containerRunEntrypointCommandOnVolume \
    $tool \
    $tag_name \
    "fidlit-app-update-ng" \
    "/bin/ash" \
    "./update-ng.sh" \
    "$(pwd)"
else
  checkYarnInstalled

	yarn ng update \
    @angular/common@^15 \
    @angular/core@^15 \
    @angular/forms@^15 \
    @angular/platform-browser@^15 \
    @angular/platform-browser-dynamic@^15 \
    @angular/router@^15 \
    @angular/service-worker@^15 \
    @angular-devkit/build-angular@^15 \
    @angular-eslint/builder@^15 \
    @angular-eslint/eslint-plugin@^15 \
    @angular-eslint/eslint-plugin-template@^15 \
    @angular-eslint/template-parser@^15 \
    @angular/cli@^15 \
    @angular/compiler@^15 \
    @angular/compiler-cli@^15 \
    @angular/language-service@^15 \
    --create-commits
fi
