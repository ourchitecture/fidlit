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

  if [ x"${LOCAL_CONTAINERS}" = "x" ]; then
    tag_name="${TAG_NAME:-ghcr.io/ourchitecture/fidlit/node-cypress-chrome:latest}"
  else
    tag_name="${TAG_NAME:-localhost/fidlit/node-cypress-chrome:latest}"
  fi

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

  yarn e2e
fi
