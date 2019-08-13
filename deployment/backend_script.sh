#!/bin/sh

container_name="api-container"
image="api-image"

rm -rf /tmp/docker
mkdir -p /tmp/
mkdir -p /var/paratracker/
cp -r $1/lib /tmp/docker

cd /tmp/docker

$2 build -t $image .
$2 create --mount type=bind,source="/var/paratracker",destination="/paratracker" --name $container_name
