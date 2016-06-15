#!/bin/bash

set -ue
cd "$(dirname "$0")"
COMMIT=`git rev-parse HEAD`
NOW=`date`

pushd output
if ! git checkout master ; then
  echo "failed checking-out master"
  exit 1
fi
popd

if ! make compile  ; then
  echo "error compiling"
fi

pushd output
if git add -A . && git commit -m "update"; then
  git push
else
  echo "did not commit"
  exit 2
fi
popd

git push origin master
