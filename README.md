

# personal scripts
- "clean": "npx hardhat clean",
- "compile": "npx hardhat compile",
- "chain": "npx hardhat node",
- "deploy": "npx hardhat run --network localhost scripts/deploy.ts",
- "deploy:rinkeby": "npx hardhat run --network rinkeby scripts/deploy.ts",
- "task:rinkeby":"npx hardhat run --network rinkeby tasks/tasks.ts",
- "test": "npx hardhat test"
- "test-cov": "hardhat coverage"


# Usage
change the .envExample file in the root folder to .env and add your secrets there P.s never use your privete key main wallet on testing network use only burned wallet for development only

```
npm i
npm run compile
npm run test
```

if you want to deploy on testing network

```
npm run deploy:rinkeby
```


