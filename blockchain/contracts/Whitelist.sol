//SPDX-License-Identifier:Unlicense
pragma solidity ^0.8.0;

contract Whitelist {
    
    mapping(address => bool) public whiteListedAddress;

    uint8 public maxWhiteListedAddresses; // máximo de direcciones en la cuenta
    uint8 public numAddressesWhitelisted; // 

    constructor(uint8 _maxWhiteListedAddresses) {
        maxWhiteListedAddresses = _maxWhiteListedAddresses;
    }

    function addAddressToWhitelist() public {
        require(!whiteListedAddress[msg.sender], "Sender has already whitelisted");
        require(numAddressesWhitelisted < maxWhiteListedAddresses, "More addresses cant be added, limit reached");
        whiteListedAddress[msg.sender] = true;
        numAddressesWhitelisted += 1;
    }
}
