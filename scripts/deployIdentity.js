async function main() {
    const DigitalIdentity = await ethers.getContractFactory("DigitalIdentity");
    console.log("Deploying DigitalIdentity...");
    const digitalIdentity = await DigitalIdentity.deploy();
    await digitalIdentity.deployTransaction.wait();
    console.log("DigitalIdentity deployed to:", digitalIdentity.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  