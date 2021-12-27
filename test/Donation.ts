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

  beforeEach(async ()=>{
    [contract_owner, addr1, addr2, ...addrs] = await ethers.getSigners();
     const Donation =await ethers.getContractFactory('Donation');//by defaulte first account becomes the owner
     donation=await Donation.deploy();
     await donation.deployed();
  });

    const donationValue=1;//1 ether 

     it("Should check if the owner is who deployed the contract and the contract balance is 0", async  ()=> {
      expect(await  donation.owner()).to.equal(contract_owner.address);
      expect(await ethers.provider.getBalance(donation.address)).to.equal(ethers.utils.parseEther(`${0}`));
    });

    it("accepts donation and checking the balance of the contract", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      expect(await ethers.provider.getBalance(donation.address)).to.equal(ethers.utils.parseEther(`${donationValue}`));
    });

    it("checks the saving address of the donater and the amount that he donated with", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      const donaters=await donation.getDonators();
      expect(donaters[0]).to.equal(addr1.address);
      const donationValueForAddress =await  donation.getDonationValueForAddress(donaters[0]);
      expect(donationValueForAddress).to.equal(ethers.utils.parseEther(`${donationValue}`));
    });

    it("restricts donaters from transfering the contract's balance to himself", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      try {
          await donation.connect(addr1).transferToOwner();
          assert(false);
        } catch (error) {
          assert(error);
      }
    });


    it("restricts donaters from transfering the contract's balance to  another public address", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      try {
          await donation.connect(addr1).transferToAddress(addr2.address);
          assert(false);
        } catch (error) {
          assert(error);
      }
    });

    it("allows owner to transfer the balance of the contract to himself", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      await donation.connect(contract_owner).transferToOwner();
      const balance =await ethers.provider.getBalance(donation.address);
      expect(balance).to.equal(ethers.utils.parseEther(`${0}`));
    });


    it("allows owner to transfer the balance of the contract to public address", async  ()=> {
      await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther(`${donationValue}`)});//donate with 1 ether
      await donation.connect(contract_owner).transferToAddress(addr1.address);
      const balance =await ethers.provider.getBalance(donation.address);
      expect(balance).to.equal(ethers.utils.parseEther(`${0}`));
    }); 
});

