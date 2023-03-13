#!/bin/sh

. ./_utils.sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

checkToolSupported $tool

if [ x"${IN_CONTAINER}" = "x" ]; then
  checkContainersInstalled $tool

  if [ x"${LOCAL_CONTAINERS}" = "x" ]; then
    tag_name="${TAG_NAME:-ghcr.io/ourchitecture/fidlit/node:latest}"
  else
    tag_name="${TAG_NAME:-localhost/fidlit/node:latest}"
  fi

  containerRunEntrypointCommandOnVolume \
    $tool \
    $tag_name \
    "fidlit-app-update-ng" \
    "/bin/ash" \
    "./update-ng.sh" \
    "$(pwd)"
else
  checkYarnInstalled

  yarn ng update --help

	yarn ng update \
    @angular/animations@^15 \
    @angular/cdk@^15 \
    @angular/common@^15 \
    @angular/core@^15 \
    @angular/forms@^15 \
    @angular/material@^15 \
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
    @angular/language-service@^15
fi
