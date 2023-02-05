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

tag_name="${TAG_NAME:-localhost/fidlit/node-chrome:latest}"

${tool} run \
  --name "fidlit-node-chrome-dev" \
  --rm \
  --interactive \
  --tty \
  --user=root \
  --cap-add=SYS_ADMIN \
  --entrypoint "/bin/ash" \
  "$tag_name"
