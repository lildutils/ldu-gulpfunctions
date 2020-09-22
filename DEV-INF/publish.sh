#!/bin/sh

main() {
    cd dist/
    npm login
    npm publish
}

main
