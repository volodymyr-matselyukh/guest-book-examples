#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"

#https://docs.near.org/develop/contracts/quickstart
near contract deploy malicious-basketball.testnet use-file build/contract.wasm with-init-call init json-args {} prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send