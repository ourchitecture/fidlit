#!/bin/sh

. ./_utils.sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

checkToolSupported $tool

# if not in a container...
if [ x"${IN_CONTAINER}" = "x" ]; then
  checkContainersInstalled $tool

  # Do not share the ".angular" directory across containers.
  if [ -d "./.angular" ]; then
    rm -rf ./.angular/
  fi

  if [ x"${LOCAL_CONTAINERS}" = "x" ]; then
    tag_name="${TAG_NAME:-ghcr.io/ourchitecture/fidlit/node:latest}"
  else
    tag_name="${TAG_NAME:-localhost/fidlit/node:latest}"
  fi

  containerRunEntrypointCommandOnVolume \
    $tool \
    $tag_name \
    "fidlit-app-check-lint" \
    "/bin/ash" \
    "./check-lint.sh" \
    "$(pwd)"

# if in a container...
else
  checkYarnInstalled
  checkNodeDependenciesDirectory

  yarn lint
fi
