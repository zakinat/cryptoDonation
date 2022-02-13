// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {

  address payable public owner;

  modifier ownerOnly()  {
    require(msg.sender == owner, "Only the owner can make transfers");
    _;
  }

  constructor() {
    owner= payable(msg.sender);
  }
  

  address[] private donators;

  struct DonaterInf{
    uint amount;
    bool exist;
  }
  mapping (address => DonaterInf ) private donationForAddress;



  function setAddress(address _address) public {
        donationForAddress[_address].exist= true;
        donators.push(_address);
  }

  function contains(address _address) public view returns (bool) {
        return donationForAddress[_address].exist;
  }



  function gatherDonation() public payable {
    require(msg.value >= .001 ether, "too small donation");
    
    if (!contains(msg.sender)) {
      setAddress(msg.sender); 
    }

    donationForAddress[msg.sender].amount+=msg.value;
  }


  function transferToAddress(address  recevier, uint256 amount) external ownerOnly {
    require(amount <= address(this).balance, "there is not enough balance, to trasfer this amount");
    payable(recevier).transfer(amount);
  
  }

  function getDonators() public view returns (address[] memory) {
    return donators;
  }

  function getDonationValueForAddress(address donater) public view returns (uint256) {
    return donationForAddress[donater].amount;
  }

}
