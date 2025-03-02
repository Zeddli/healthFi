async function main() {
    const ConsentManager = await ethers.getContractFactory("ConsentManager");
    console.log("Deploying ConsentManager...");
  
    const consentManager = await ConsentManager.deploy();
    // No need to call deployed() if deploy() is already awaited.
    
    console.log("ConsentManager deployed to:", consentManager.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  