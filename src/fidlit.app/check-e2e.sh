#!/bin/sh

. ./_utils.sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

checkToolSupported $tool

if [ x"${IN_CONTAINER}" = "x" ]; then
  checkContainersInstalled $tool

  tag_name="${TAG_NAME:-localhost/fidlit/node-cypress-chrome:latest}"

  containerRunEntrypointCommandOnVolume \
    $tool \
    $tag_name \
    "fidlit-app-check-e2e" \
    "/bin/bash" \
    "./check-e2e.sh" \
    "$(pwd)"
else
  checkYarnInstalled
  checkNodeDependenciesDirectory

  if [ -d "./.angular" ]; then
    rm -rf ./.angular/
  fi

  yarn e2e
fi
