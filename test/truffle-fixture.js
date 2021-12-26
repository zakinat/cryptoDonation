const Donation = artifacts.require("Donation");

module.exports = async ()=> {
  const donation =await Donation.new();
  Donation.setAsDeployed(donation);
};
