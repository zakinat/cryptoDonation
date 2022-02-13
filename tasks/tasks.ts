import { ethers } from 'hardhat';
import '@nomiclabs/hardhat-ethers';

import * as dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)


async function main () {
  const myPrivateKey= process.env.DEPLOYER_PRIVATE_KEY

  //const DonationStatus= await makeDonation(myPrivateKey, 0.001)


  const donaters =await getDonaters(myPrivateKey)


  if (donaters[0]) {
    const ethValue = await getDonation(myPrivateKey, donaters[0]);
  }
  
  const addressReciver= `0x112f6b9C416BA1Fc9B650F82Ad269a182Ca9B0CC`;
  //await transferDonation(myPrivateKey, addressReciver, 0.002);

}
  




  main()
     .then(() => process.exit(0))
     .catch(error => {
       console.error(error);
       process.exit(1);
     });



    async function getSmartContract(privateKey: any) {
      const Donation = await ethers.getContractFactory("Donation");
      const donation = await Donation.attach("0x01804A4e70cAd7D7FC9878373edED2E8aAc62364");
   
      const signer =await  new ethers.Wallet(`0x${privateKey}`, provider);
      const contractSigner = donation.connect(signer);
   
      return donation
    }
   
   
    async function makeDonation(privateKey: any, value: any) {
      const donation = await  getSmartContract(privateKey);
   
      try {
        await donation.gatherDonation({ value: ethers.utils.parseEther(`${value}`) })
        console.log('Donation Done!')
        
        return 'Donation Done!'
   
      } catch (error) {
        console.log(error)
   
        return 'Donation Failed :('
      }
     
    }

    async function getDonaters(privateKey: any) {
      const donation = await  getSmartContract(privateKey);
   
      try {
        const donaters= await donation.getDonators()
        console.log(donaters)
        return donaters
   
      } catch (error) {
        console.log(error)
   
        return 'get Donaters Failed :('
      }
     
    }


    async function getDonation(privateKey: any, address: any) {
      const donation = await  getSmartContract(privateKey);
   
      try {
        const weiValue= await donation.getDonationValueForAddress(address)

        console.log(ethers.utils.formatEther(weiValue), ' ether')
        
        return ethers.utils.formatEther(weiValue)
   
      } catch (error) {
        console.log(error)
   
        return 'get Donation Failed :('
      }
     
    }


    async function transferDonation(privateKey: any, address: any, amount: any) {
      const donation = await  getSmartContract(privateKey);
   
      try {
        await donation.transferToAddress(address, ethers.utils.parseEther(`${amount}`))

        console.log('transfer donation done')
        
        return true
   
      } catch (error) {
        console.log(error)
   
        return 'transfer Donation Failed :('
      }
     
    }

