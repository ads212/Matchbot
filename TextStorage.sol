// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

contract TextStorage {

    // Store a list of text entries
    string[] public storedTexts;

    RandomNumberV2Interface internal randomV2;

    // Constructor initializing the RandomNumberV2Interface contract
    constructor() {
        randomV2 = ContractRegistry.getRandomNumberV2();
    }

    // Function to store text in the list
    function storeText(string memory _text) public {
        storedTexts.push(_text);
    }

    // Function to retrieve text by index
    function getText(uint256 _index) public view returns (string memory) {
        require(_index < storedTexts.length, "Index out of bounds");
        return storedTexts[_index];
    }

    // Fetch the latest secure random number
    function getSecureRandomNumber()
        external
        view
        returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
    {
        (randomNumber, isSecure, timestamp) = randomV2.getRandomNumber();
        require(isSecure, "Random number is not secure");
        return (randomNumber, isSecure, timestamp);
    }
}
