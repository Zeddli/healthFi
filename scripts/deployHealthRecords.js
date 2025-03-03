async function main() {
    const HealthRecords = await ethers.getContractFactory("HealthRecords");
    console.log("Deploying HealthRecords...");
    const healthRecords = await HealthRecords.deploy();
    // await healthRecords.deployTransaction.wait();
    console.log("HealthRecords deployed to:", healthRecords.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  