// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donation {

  address payable public owner;
  address[] public donators;
  //save the amount of every donation to the address of the sender
  struct DonaterInf{
    uint amount;
  }
  mapping (address => DonaterInf ) public donationForAddress;

  constructor(){
    owner= payable(msg.sender);
  }
  //testing
  modifier onlyOwener(){
    require(owner==payable(msg.sender),"Not allowed");
    _;
  }

  function gatherDonation() public payable{
    require(msg.value >= .001 ether);
    donators.push(msg.sender);
    donationForAddress[msg.sender].amount+=msg.value/(1e18);//msg value return wei, that is ether=1e18 wei
  }

  function transferToOwner() external{
    require(msg.sender == owner);
    owner.transfer(address(this).balance);
  }

  function transferToAddress(address  recevier) external{
    require(msg.sender == owner);
    payable(recevier).transfer(address(this).balance);
  }

  function getDonators() public view returns (address[] memory){
    return donators;
  }

}
