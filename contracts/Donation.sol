// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {

  address payable public owner;
  address[] private donators;
  //save the amount of every donation to the appropriate address of the sender
  struct DonaterInf{
    uint amount;
  }
  mapping (address => DonaterInf ) private donationForAddress;

  modifier ownerOnly(){
    require(msg.sender == owner);
    _;
  }

  constructor(){
    owner= payable(msg.sender);
  }
  

  function gatherDonation() public payable{
    require(msg.value >= .001 ether);
    donators.push(msg.sender);
    donationForAddress[msg.sender].amount+=msg.value;//msg value return wei, that is ether=1e18 wei so the value stored in wei
  }

  function transferToOwner() external ownerOnly{
    owner.transfer(address(this).balance);
  }

  function transferToAddress(address  recevier) external ownerOnly{
    payable(recevier).transfer(address(this).balance);
  }

  function getDonators() public view returns (address[] memory){
    return donators;
  }

  function getDonationValueForAddress(address donater) public view returns (uint){
    return donationForAddress[donater].amount;
  }

}
