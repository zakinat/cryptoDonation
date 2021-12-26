/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-truffle5");
 require("@nomiclabs/hardhat-waffle");
 const {ACCOUNT_PRIVETE_KEY, URL} =require('./secrets.json')
module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: URL, //Infura url with projectId
      accounts: [ACCOUNT_PRIVETE_KEY] // add the account that will deploy the contract (private key)
     },
   }
};
