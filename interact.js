const { ethers } = require("hardhat");

async function main() {
  // Replace with the deployed contract address
  const contractAddress = "";

  // Replace with the ABI generated after compilation
  const contractABI = [
    "function storeText(string memory _text) public",
    "function getText(uint256 _index) public view returns (string memory)",
    "function getSecureRandomNumber() public view returns (uint256 randomNumber, bool isSecure, uint256 timestamp)"
  ];

  // Get the contract instance
  const [owner] = await ethers.getSigners();
  const textStorage = new ethers.Contract(contractAddress, contractABI, owner);

  // Example: Store new text in the list
  const textToStore1 = "Hello, this is the first text!";
  console.log("Storing text:", textToStore1);
  const tx1 = await textStorage.storeText(textToStore1);
  await tx1.wait(); // Wait for the transaction to be mined
  console.log("Text stored!");

  // Store another text
  const textToStore2 = "Here is the second text!";
  console.log("Storing text:", textToStore2);
  const tx2 = await textStorage.storeText(textToStore2);
  await tx2.wait(); // Wait for the transaction to be mined
  console.log("Text stored!");

  // Retrieve the text by index
  const indexToRetrieve = 1; // Example: Retrieve the text at index 0
  const retrievedText = await textStorage.getText(indexToRetrieve);
  console.log(`Text at index ${indexToRetrieve}:`, retrievedText);

  // Example: Fetch a secure random number
  try {
    const [randomNumber, isSecure, timestamp] = await textStorage.getSecureRandomNumber();
    console.log("Secure Random Number:", randomNumber);
    console.log("Is the random number secure?", isSecure);
    console.log("Timestamp of random number generation:", timestamp);
  } catch (error) {
    console.error("Error fetching secure random number:", error);
  }
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
