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

if [ "$tool" = "shell" ]; then
  out_path="${OUT_PATH:-/workspace/out/}"
  target_path="${out_path}src/api/examples/industries/"

  cp \
    /workspace/dist/airline-industry-capabilities.json \
    ${target_path}airlines/capabilities.json

  cp \
    /workspace/dist/aerospace-and-defense-industry-capabilities.json \
    ${target_path}aerospace-and-defense/capabilities.json

  cp \
    /workspace/dist/automotive-industry-capabilities.json \
    ${target_path}automotive/capabilities.json

  cp \
    /workspace/dist/banking-industry-capabilities.json \
    ${target_path}banking/capabilities.json

  cp \
    /workspace/dist/broadcasting-industry-capabilities.json \
    ${target_path}broadcasting/capabilities.json
else
  tag_name="${TAG_NAME:-localhost/fidlit/capability-models:latest}"

  ${tool} run \
    --name "fidlit-capability-models" \
    --rm \
    --interactive \
    --tty \
    --entrypoint "/bin/ash" \
    --env TOOL=shell \
    --volume "$(pwd)/src/fidlit.app/":/workspace/out/ \
    "$tag_name" \
    ./capability-models.sh
fi
