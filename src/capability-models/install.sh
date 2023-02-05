#!/bin/sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

if [ "$tool" != "docker" ]; then
  if [ "$tool" != "podman" ]; then
    echo "The \"tool\" argument value \"${tool}\" is not recognized." 1>&2
    exit 1
  fi
fi

if [ x"${IN_CONTAINER}" = "x" ]; then
  if ! command -v ${tool} >/dev/null 2>&1; then
    echo "The CLI for ${tool} commands could not be found and must be installed." 1>&2
    exit 1
  fi

  tag_name="${TAG_NAME:-localhost/fidlit/node:latest}"

  ${tool} run \
    --name "fidlit-capability-models-install" \
    --rm \
    --interactive \
    --tty \
    --entrypoint "/bin/ash" \
    --env IN_CONTAINER=1 \
    --env CI=1 \
    --volume "$(pwd)":/usr/src/app \
    --workdir /usr/src/app \
    "$tag_name" \
    ./install.sh
else
  if ! command -v yarn >/dev/null 2>&1; then
    echo "The CLI for yarn commands could not be found and must be installed." 1>&2
    exit 1
  fi

  yarn install \
      --frozen-lockfile \
      --non-interactive

  yarn start
fi
