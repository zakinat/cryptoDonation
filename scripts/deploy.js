const hre = require("hardhat"); //import the hardhat
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const Donation = await hre.ethers.getContractFactory("Donation"); // Getting the Contract
  const donation = await Donation.deploy(); //deploying the contract

  await donation.deployed(); // waiting for the contract to be deployed

  console.log("Donation deployed to:", donation.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 
