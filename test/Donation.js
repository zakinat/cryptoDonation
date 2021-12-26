
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

    it("restricts donaters from transfering the contract's balance to himself or another public address", async  ()=> {
      

    });


});

