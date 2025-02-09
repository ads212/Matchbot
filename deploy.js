const { ethers } = require("hardhat");

async function main() {
    // Get the contract and signer
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Fetch the contract factory
    const TextStorage = await ethers.getContractFactory("TextStorage");

    // Deploy the contract
    const textStorage = await TextStorage.deploy();
    console.log("TextStorage contract deployed to:", textStorage.address);

    // Call a state-changing function like storeText
    let tx = await textStorage.storeText("Hello, Flare!");
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction mined!");

    // Call the getSecureRandomNumber function (view function)
    const [randomNumber, isSecure, timestamp] = await textStorage.getSecureRandomNumber();
    console.log(`Random Number: ${randomNumber}, Is Secure: ${isSecure}, Timestamp: ${timestamp}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
