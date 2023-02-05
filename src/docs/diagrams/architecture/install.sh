#!/bin/sh

# NOTE: for debugging, add `-x`
set -e

tool="${FIDLIT_TOOL:-podman}"

tag_name="${TAG_NAME:-docker.io/tomkludy/drawio-renderer:latest}"
shared_memory="${SHARED_MEMORY:-1g}"
port_host="${PORT_HOST:-5000}"
port_app="${PORT_APP:-5000}"

$tool pull $tag_name

container_name="fidlit-docs-diagrams-architecture"

# Ensure enough working memory with `--shm-size`. (HTTP error "413")
$tool run \
  --name="$container_name" \
  --detach \
  --publish $port_host:$port_app \
  --shm-size="$shared_memory" \
  "$tag_name"

if [ ! -d "./dist/" ]; then
  mkdir ./dist/
fi

diagram_name="project-structure"

# https://github.com/tomkludy/docker-drawio-renderer
# https://hub.docker.com/r/tomkludy/drawio-renderer
# https://j2r2b.github.io/2019/08/06/drawio-cli.html
# BUG: no support for pages (https://github.com/tomkludy/docker-drawio-renderer/issues/1)
# Generate an image from the diagram.
# Ignore any errors, so that the container can be stopped and removed.
curl \
  --data @${diagram_name}.drawio \
  --header "Accept: image/png" \
  http://localhost:5000/convert_file \
  --output ./dist/${diagram_name}.png \
  || true

$tool rm \
  --force \
  --volumes \
  "$container_name"
