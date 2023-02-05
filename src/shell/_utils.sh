#!/bin/sh

checkToolSupported() {
  tool="$1"

  if [ "$tool" != "docker" ]; then
    if [ "$tool" != "podman" ]; then
      if [ "$tool" != "shell" ]; then
        echo "The \"tool\" argument value \"${tool}\" is not recognized." 1>&2
        exit 1
      fi
    fi
  fi
}

checkYarnInstalled() {
  if ! command -v yarn >/dev/null 2>&1; then
    echo "The CLI for yarn commands could not be found and must be installed." 1>&2
    exit 1
  fi
}

checkContainersInstalled() {
  container_tool="$1"

  if ! command -v ${container_tool} >/dev/null 2>&1; then
    echo "The CLI for ${container_tool} commands could not be found and must be installed." 1>&2
    exit 1
  fi
}

checkNodeDependenciesDirectory() {
  if [ ! -d "./node_modules/" ]; then
    echo "Missing required \"./node_modules/\" directory." 1>&2
    exit 1
  fi
}

containerRunEntrypointCommandOnVolume() {
  container_tool="$1"
  container_tag="$2"
  container_name="$3"
  container_entrypoint="$4"
  container_command="$5"
  container_volume="$6"

  # TODO: dynamic arguments like https://stackoverflow.com/questions/28678505/add-command-arguments-using-inline-if-statement-in-bash
  if [ -f "./.env" ]; then
    ${container_tool} run \
      --name "$container_name" \
      --rm \
      --entrypoint "$container_entrypoint" \
      --env IN_CONTAINER="1" \
      --env CI=1 \
      --env-file "./.env" \
      --volume "$container_volume":/usr/src/app \
      --workdir /usr/src/app \
      "$container_tag" \
      $container_command
  else
    ${container_tool} run \
      --name "$container_name" \
      --rm \
      --entrypoint "$container_entrypoint" \
      --env IN_CONTAINER="1" \
      --env CI=1 \
      --volume "$container_volume":/usr/src/app \
      --workdir /usr/src/app \
      "$container_tag" \
      $container_command
  fi
}
