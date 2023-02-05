#!/bin/sh

. ./_utils.sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

checkToolSupported $tool

if [ x"${IN_CONTAINER}" = "x" ]; then
  checkContainersInstalled $tool

  # Do not share the ".angular" directory across containers.
  if [ -d "./.angular" ]; then
    rm -rf ./.angular/
  fi

  tag_name="${TAG_NAME:-localhost/fidlit/node-chrome:latest}"

  containerRunEntrypointCommandOnVolume \
    $tool \
    $tag_name \
    "fidlit-app-check-unit" \
    "/bin/ash" \
    "./check-unit.sh" \
    "$(pwd)"
else
  checkYarnInstalled
  checkNodeDependenciesDirectory

  yarn test
fi
