import { ethers } from 'hardhat';
import '@nomiclabs/hardhat-ethers';

import * as dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)

async function main () {

  const signer =await  new ethers.Wallet(`0x${process.env.DEPLOYER_PRIVATE_KEY}`, provider);

  const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.attach("0x331e428047c9b2DA5695E3265710a47955Fc19EB");

    const contractSigner = donation.connect(signer);

    //await donation.gatherDonation({ value: ethers.utils.parseEther(`${0.001}`)})

    const donaters= await donation.getDonators()
    
    console.log(donaters[0])

    console.log(await donation.getDonationValueForAddress(donaters[0]))

}
  




  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });


