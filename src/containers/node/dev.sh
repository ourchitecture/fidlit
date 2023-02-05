#!/bin/sh

set -eu

tool="${FIDLIT_TOOL:-podman}"

if [ "$tool" != "docker" ]; then
  if [ "$tool" != "podman" ]; then
    echo "The \"tool\" argument value \"${tool}\" is not recognized." 1>&2
    exit 1
  fi
fi

if ! command -v ${tool} >/dev/null 2>&1; then
  echo "The CLI for ${tool} commands could not be found and must be installed." 1>&2
  exit 1
fi

if [ x"${LOCAL_CONTAINERS}" = "x" ]; then
  tag_name="${TAG_NAME:-ghcr.io/ourchitecture/fidlit/node:latest}"
else
  tag_name="${TAG_NAME:-localhost/fidlit/node:latest}"
fi

${tool} run \
  --name "fidlit-node-dev" \
  --rm \
  --interactive \
  --tty \
  --entrypoint "/bin/ash" \
  "$tag_name"
