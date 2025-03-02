const { ethers } = require("hardhat");

async function main() {
  const ConsentManager = await ethers.getContractFactory("ConsentManager");
  console.log("Deploying ConsentManager...");
  const consentManager = await ConsentManager.deploy();

  // Wait for the deployment transaction to be mined
  await consentManager.deployTransaction.wait();

  console.log("ConsentManager deployed to:", consentManager.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

