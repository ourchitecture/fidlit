#!/bin/sh

. ./_utils.sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"
port_app="${PORT_APP:-4200}"
port_host="${PORT_HOST:-4200}"

checkToolSupported $tool

if [ x"${IN_CONTAINER}" = "x" ]; then
  checkContainersInstalled $tool

  if [ x"${LOCAL_CONTAINERS}" = "x" ]; then
    tag_name="${TAG_NAME:-ghcr.io/ourchitecture/fidlit/node:latest}"
  else
    tag_name="${TAG_NAME:-localhost/fidlit/node:latest}"
  fi

  ${tool} run \
    --name "fidlit-app-dev" \
    --rm \
    --interactive \
    --tty \
    --entrypoint "/bin/ash" \
    --env IN_CONTAINER="1" \
    --env CI=1 \
    --env PORT_APP=${port_app} \
    --env-file "./.env" \
    --volume "$(pwd)":/usr/src/app \
    --workdir /usr/src/app \
    --publish ${port_host}:${port_app} \
    "$tag_name" \
    "./dev.sh"
else
  checkYarnInstalled

  # BUG: A container may not use `--watch` correctly on a volume due to
  #      insufficient file permissions. Therefore, `--poll` is used to
  #      ensure changes are picked up in a timely manner.
  yarn start \
    --port ${port_app} \
    --poll 1000
fi
