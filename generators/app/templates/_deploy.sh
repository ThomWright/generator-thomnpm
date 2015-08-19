#!/bin/bash

npm run build

if [ $# -eq 0 ]; then
    echo Deploying to NPM
    npm publish
  else
    echo Deploying locally to: $1/node_modules/<%= lowerCaseName %>/
    cp -R dist $1/node_modules/<%= lowerCaseName %>/
fi
