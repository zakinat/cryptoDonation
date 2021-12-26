const { equal } = require("assert");

const Donation = artifacts.require("Donation");
require("chai").use(require("chai-bignumber")(web3.bignumber)).should();

contract("Donation", (accounts) => {

    let donationcontract=null;

    it("Should check the owner is valid", async  ()=> {
      donationcontract=await Donation.deployed();
      const owner =await  donationcontract.owner.call();
      owner.should.be.bignumber.eql(accounts[0]);
    });

    it("accept donation and save the address of the sender and save the value of donation in ether value for the sender address", async  ()=> {
      donationcontract=await Donation.deployed();
      let new_Donater=accounts[1];
      const donationValue=1;//1 ether
      await donationcontract.gatherDonation({from:new_Donater, value: String(donationValue*11e18)});//donate with 1 ether
      const donaters=await donationcontract.getDonators()
      const donationValueForAddress =await  donationcontract.getDonationValueForAddress(donaters[0]);
      assert.equal(new_Donater,donaters[0],'error in saving the address of donater')
      assert.equal(donationValue,donationValueForAddress.length,"the stored  donation value doesn't agree with the donation")
    });
});

