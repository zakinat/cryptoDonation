import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'solidity-coverage'

import * as dotenv from 'dotenv';
import {HardhatUserConfig} from 'hardhat/types'
dotenv.config();
/* This loads the variables in your .env file to `process.env` */
const { DEPLOYER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers:[{version: '0.8.0', settings: {}}]
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