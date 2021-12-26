
const { web3 } = require("hardhat");
require("chai").use(require("chai-bignumber")(web3.bignumber)).should();

const Donation = artifacts.require("Donation");

contract("Donation", (accounts) => {

    let donationcontract=null;
    const donationValue=1*11e18;//1 ether to wei
    const contract_owner=accounts[0];//by defaulte first account becomes the owner
    const new_Donater=accounts[1];

    it("Should check if the owner is who deployed the contract", async  ()=> {
      donationcontract=await Donation.deployed();
      const owner =await  donationcontract.owner.call();
      owner.should.be.bignumber.eql(contract_owner);
    });

    it("accepts donation and checking the balance of the contract", async  ()=> {
      await donationcontract.gatherDonation({from:new_Donater, value: String(donationValue)});//donate with 1 ether
      const balance =await web3.eth.getBalance(donationcontract.address);
      assert.equal(donationValue,balance,'wrong balance')
    });

    it("checks the saving address of the donater and the amount that he donated with", async  ()=> {
      const donaters=await donationcontract.getDonators()
      assert.equal(new_Donater,donaters[0],'error in saving the address of donater')
      const donationValueForAddress =await  donationcontract.getDonationValueForAddress(donaters[0]);
      assert.equal(donationValue,donationValueForAddress,"the stored  donation value doesn't agree with the donation")
    });

    it("restricts donaters from transfering the contract's balance to himself", async  ()=> {
      try {
          await donationcontract.transferToOwner({from: new_Donater});
          assert(false);
        } catch (error) {
          assert(error)
      }

    });
    it("restricts donaters from transfering the contract's balance to  another public address", async  ()=> {
      try {
          await donationcontract.transferToAddress(accounts[2],{from: new_Donater});
          assert(false);
        } catch (error) {
          assert(error)
      }

    });

    it("allows owner to transfer the balance of the contract to himself", async  ()=> {
      await donationcontract.transferToOwner({from: accounts[0]});
      const balance =await web3.eth.getBalance(donationcontract.address);
      assert.equal(0,balance,"balance hasn't transfered to owner")
    });

    it("accepts donation for the second time  and checking the balance of the contract", async  ()=> {
      await donationcontract.gatherDonation({from:new_Donater, value: String(donationValue)});//donate with 1 ether
      const balance =await web3.eth.getBalance(donationcontract.address);
      assert.equal(donationValue,balance,'wrong balance')
    });

    it("allows owner to transfer the balance of the contract to public address", async  ()=> {
      await donationcontract.transferToAddress(accounts[2],{from: accounts[0]});
      const balance =await web3.eth.getBalance(donationcontract.address);
      assert.equal(0,balance,"balance hasn't transfered to owner")
    });


});

