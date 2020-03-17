#!/bin/bash
set -e
export SHELLOPTS

# prepare gitbook
./node_modules/.bin/gitbook install

# all files to the same date to reduce the amount of updated files after each new generation
touch -t 201811111111.11 workshop/*

# patch gitbook so START_TIME remains the same in the generated html
#sed -i 's/var START_TIME = new Date();/var START_TIME = new Date(2018, 10, 11, 11, 11, 11);/g' ~/.gitbook/versions/3.2.3/lib/gitbook.js

# build the book
./node_modules/.bin/gitbook build
