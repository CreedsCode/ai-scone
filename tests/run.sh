#!/bin/sh
cd $(dirname $0)

IEXEC_OUT=/tmp/iexec_out

rm -rf $IEXEC_OUT
mkdir -p $IEXEC_OUT

docker run --rm -e IEXEC_OUT=/iexec_out -e IEXEC_IN=/iexec_in -v $IEXEC_OUT:/iexec_out node-hello-world $@

echo
find $IEXEC_OUT