async function main() {
  const ConsentManager = await ethers.getContractFactory("ConsentManager");
  console.log("Deploying ConsentManager...");
  const consentManager = await ConsentManager.deploy();
  // No need to wait on deployTransaction; use consentManager.target for the deployed address
  console.log("ConsentManager deployed to:", consentManager.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
