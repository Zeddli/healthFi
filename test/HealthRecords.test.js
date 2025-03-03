const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HealthRecords", function () {
  let HealthRecordsFactory;
  let healthRecords;
  let patient, other;

  beforeEach(async function () {
    [patient, other] = await ethers.getSigners();
    HealthRecordsFactory = await ethers.getContractFactory("HealthRecords");
    healthRecords = await HealthRecordsFactory.deploy();
    // await healthRecords.deployTransaction.wait();
  });

  it("should add a record successfully", async function () {
    const ipfsHash = "QmTestHash";
    const tx = await healthRecords.connect(patient).addRecord(ipfsHash);
    await tx.wait();

    expect(await healthRecords.recordCount()).to.equal(1);
    const record = await healthRecords.getRecord(1);
    expect(record.patient).to.equal(patient.address);
    expect(record.ipfsHash).to.equal(ipfsHash);
    expect(record.timestamp).to.be.gt(0);
  });

  it("should revert when getting a non-existent record", async function () {
    await expect(healthRecords.getRecord(999)).to.be.revertedWith("Record does not exist");
  });
});
