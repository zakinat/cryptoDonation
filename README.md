# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
```
# personal scripts
-"clean": "npx hardhat clean",
-"compile": "npx hardhat compile",
-"chain": "npx hardhat node",
-"deploy": "npx hardhat run --network localhost scripts/deploy.ts",
-"deploy:rinkeby": "npx hardhat run --network rinkeby scripts/deploy.ts",
-"test": "npx hardhat test"

# Usage
change the .envExample file in the root folder to .env and add your secrets there P.s never use your privete key main wallet on testing network use only burned wallet for development only

```
npm i
npm run compile
npm run test
npm run chain
```

if you want to deploy on testing network

```
npm run deploy:rinkeby
```


