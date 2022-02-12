import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from 'hardhat';
import chai from "chai";
const { expect } = chai;
import assert from 'assert'

describe("Donation", () => {
  let contract_owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let donation:any=null;

  const donationValue=1;//1 ether 

  beforeEach(async ()=>{
    [contract_owner, addr1, addr2, ...addrs] = await ethers.getSigners();
     const Donation =await ethers.getContractFactory('Donation');//by defaulte first account becomes the owner
     donation=await Donation.deploy();
     await donation.deployed();
  });

    

     it("Should check if the owner is who deployed the contract and the contract balance is 0", async  ()=> {
      expect(await  donation.owner()).to.equal(contract_owner.address);
      expect(await ethers.provider.getBalance(donation.address)).to.equal(ethers.utils.parseEther(`${0}`));
    });


    it("accepts donation and checking the balance of the contract", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      expect(await ethers.provider.getBalance(donation.address)).to.equal(ethers.utils.parseEther(`${donationValue}`));
    });


    it("checks the saving address (without repeating) of the donaters with the total amount of donation that he donated with", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue*2}`)});//donate with 2 ether
      await donation.connect(addr2).gatherDonation({ value: ethers.utils.parseEther(`${donationValue*2}`)});//donate with 2 ether
      
      const donaters=await donation.getDonators();

      expect(donaters.length).to.equal(2);
      expect(donaters[0]).to.equal(addr1.address);
      expect(donaters[1]).to.equal(addr2.address);

      const donationValueForFstAddress =await  donation.getDonationValueForAddress(donaters[0]);
      expect(donationValueForFstAddress).to.equal(ethers.utils.parseEther(`${donationValue*3}`));
      
      const donationValueForScdAddress =await  donation.getDonationValueForAddress(donaters[1]);
      expect(donationValueForScdAddress).to.equal(ethers.utils.parseEther(`${donationValue*2}`));
    });


    it("restricts donaters from transfering amount to  another public address", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      
      await expect(
         donation.connect(addr1).transferToAddress(addr2.address, ethers.utils.parseEther(`${donationValue/2}`))
        ).to.be.revertedWith("Only the owner can make transfers");
      
    });



    it("allows owner to transfer amount from the contract to public address", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      await donation.connect(contract_owner).transferToAddress(addr1.address, ethers.utils.parseEther(`${donationValue}`));
      const balance =await ethers.provider.getBalance(donation.address);
      expect(balance).to.equal(ethers.utils.parseEther(`${0}`));
    });



    it("checks that the owner can't withdraw more than the balance in smart contract ", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      
      await expect(
        donation.connect(contract_owner).transferToAddress(addr1.address, ethers.utils.parseEther(`${donationValue*2}`))
      ).to.be.revertedWith("there is not enough balance, to trasfer this amount");
      
    });


    it("checks that the donation is bigger than 0.001 ether ", async  ()=> {
      
      await expect(
        donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${0.0001}`)})
      ).to.be.revertedWith("too small donation");
      
    });

});

