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

  container_name="fidlit-app-dev"

  if [ "$(${tool} ps --all --quiet --filter name=${container_name})" ]; then
    echo 'Removing existing container...'
    ${tool} rm \
      ${container_name} \
      --force
    echo 'Successfully removed existing container.'
  fi

  ${tool} run \
    --name "${container_name}" \
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
  checkPnpmInstalled

  # BUG: A container may not use `--watch` correctly on a volume due to
  #      insufficient file permissions. Therefore, `--poll` is used to
  #      ensure changes are picked up in a timely manner.
  echo ''
  echo 'IGNORE: You may safely ignore the error "Warning: Running a'
  echo '        server with --disable-host-check is a security risk."'
  echo '        This is used intentionally inside of a container.'
  echo ''
  pnpm start \
    --port ${port_app} \
    --host 0.0.0.0 \
    --disable-host-check \
    --poll 1000
fi
