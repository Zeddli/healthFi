async function main() {
    const signers = await ethers.getSigners();
    console.log("Accounts:");
    signers.forEach((signer, index) => {
      console.log(`${index}: ${signer.address}`);
    });
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  