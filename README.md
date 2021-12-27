# Donation_smartContract
a smart contract written in solidity to accept donations from users
and save the addres of donater and the corresponding value of donation
and restrict the transformation of the contract's balance to only the owner of the contract and he can transfer it to himself or to another public address
- a  test unit was written in folder test/Donation.js using npx hardhat test
- a deploying script was written to deploy the contract to rinkeby.infura network (P.s couldn't test the script because i couldn't able to get dummy eth) using npx hardhat run scripts/deploy.js --network rinkeby


# USAGE

you need to rename the file (secretsExample.json) to (secrets.json) and fill it with yours values or leave it with empty values if you don't want to deploy but you must rename the file 

for testing it localy 

```
npm i 
npm run test
```

for testing it on ganache

```
npm i 
truffle compile
truffle migrate
```

for deploying to the rinkeby.infura network 

```
npm i 
npm run deploy
```