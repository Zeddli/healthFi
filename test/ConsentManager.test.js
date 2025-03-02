const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConsentManager", function () {
  let ConsentManager;
  let consentManager;
  let patient, provider, other;

  beforeEach(async function () {
    [patient, provider, other] = await ethers.getSigners();
    const ConsentManagerFactory = await ethers.getContractFactory("ConsentManager");
    consentManager = await ConsentManagerFactory.deploy();
    // await consentManager.deployed();
  });

  it("should grant consent successfully", async function () {
    const purpose = "Data sharing for research";
    await expect(
      consentManager.connect(patient).grantConsent(provider.address, purpose)
    )
      .to.emit(consentManager, "ConsentGranted")
      .withArgs(patient.address, provider.address, purpose);

    expect(await consentManager.hasConsent(patient.address, provider.address)).to.equal(true);
  });

  it("should update consent successfully", async function () {
    const initialPurpose = "Initial purpose";
    const newPurpose = "Updated purpose";
    await consentManager.connect(patient).grantConsent(provider.address, initialPurpose);
    
    await expect(
      consentManager.connect(patient).updateConsent(provider.address, newPurpose)
    )
      .to.emit(consentManager, "ConsentUpdated")
      .withArgs(patient.address, provider.address, newPurpose);
  });

  it("should revoke consent successfully", async function () {
    const purpose = "Data sharing";
    await consentManager.connect(patient).grantConsent(provider.address, purpose);
    
    await expect(
      consentManager.connect(patient).revokeConsent(provider.address)
    )
      .to.emit(consentManager, "ConsentRevoked")
      .withArgs(patient.address, provider.address);

    expect(await consentManager.hasConsent(patient.address, provider.address)).to.equal(false);
  });

  it("should fail updating if consent not granted", async function () {
    await expect(
      consentManager.connect(patient).updateConsent(provider.address, "New purpose")
    ).to.be.revertedWith("Consent not granted");
  });

  it("should fail revoking if consent not granted", async function () {
    await expect(
      consentManager.connect(patient).revokeConsent(provider.address)
    ).to.be.revertedWith("Consent not granted");
  });
});
