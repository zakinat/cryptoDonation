import '@nomiclabs/hardhat-waffle';

import * as dotenv from 'dotenv';
import {  task } from 'hardhat/config';
import {HardhatUserConfig} from 'hardhat/types'
dotenv.config();
/* This loads the variables in your .env file to `process.env` */
const { DEPLOYER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers:[{version: '0.8.4', settings: {}}]
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 1,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 42,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 4,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
    },
  },
};

export default config;