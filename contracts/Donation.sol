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
  

//save the addresses to a mapper
  address[] private donators; 
  mapping (address => bool) public Addresses;

  function setAddress(address _address) public {
        Addresses[_address]=true;
  }

  function contains(address _address) public view returns (bool) {
        return Addresses[_address];
  }

  //save the amount of every donation to the appropriate sender address
  mapping (address => uint256 ) private donationForAddress;


  function gatherDonation() public payable {
    require(msg.value >= .001 ether, "too small donation");
    
    if (!contains(msg.sender)) {
      setAddress(msg.sender);
      donators.push(msg.sender);
    }

    donationForAddress[msg.sender]+=msg.value;
  }


  function transferToAddress(address  recevier, uint256 amount) external ownerOnly {
    require(amount <= getBalance(), "there is not enough balance, to trasfer this amount");
    payable(recevier).transfer(amount);
  
  }

  function getDonators() public view returns (address[] memory) {
    return donators;
  }

  function getDonationValueForAddress(address donater) public view returns (uint256) {
    return donationForAddress[donater];
  }

  function getBalance() public view returns (uint256) {
         return address(this).balance;
  }

}
