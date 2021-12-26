const Donation = artifacts.require("Donation");
require("chai").use(require("chai-bignumber")(web3.bignumber)).should();

contract("Donation", ([account]) => {

    let donationcontract=null;

    it("Should check the owner is valid", async  ()=> {
      donationcontract=await Donation.deployed();
      const owner =await  donationcontract.owner.call();
      owner.should.be.bignumber.eql(account);
    });
  });

