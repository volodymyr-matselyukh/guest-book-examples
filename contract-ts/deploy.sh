#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"


#near create-account matseliukh-test.testnet --useFaucet

#https://docs.near.org/develop/contracts/quickstart
near deploy tired-cobweb.testnet build/contract.wasm 