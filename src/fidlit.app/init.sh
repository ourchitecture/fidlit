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
    "fidlit-app-init" \
    "/bin/ash" \
    "./init.sh" \
    "$(pwd)"
else
  checkYarnInstalled

  # optional clean install for new dependencies or resetting the lockfile
  if [ x"${YARN_CLEAN_INSTALL}" == "x" ]; then
    yarn install \
        --frozen-lockfile \
        --non-interactive
  else
    yarn install
  fi
fi
