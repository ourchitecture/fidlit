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

  tag_name="${TAG_NAME:-localhost/fidlit/capability-models:latest}"

  ${tool} run \
    --name "fidlit-capability-models" \
    --rm \
    --entrypoint "/bin/ash" \
    --env IN_CONTAINER=1 \
    --env CI=1 \
    --volume "$(pwd)/src/fidlit.app/":/workspace/out/ \
    "$tag_name" \
    ./capability-models.sh
else
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
fi
