const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DigitalIdentity", function () {
  let digitalIdentity;
  let DigitalIdentityFactory;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    DigitalIdentityFactory = await ethers.getContractFactory("DigitalIdentity");
    digitalIdentity = await DigitalIdentityFactory.deploy();
    // In ethers v6, the deployed contract's address is stored in "target"
    // Wait for the deployment transaction to be mined:
    // await digitalIdentity.deployTransaction.wait();
  });

  describe("registerIdentity", function () {
    it("should register an identity successfully", async function () {
      const tx = await digitalIdentity.connect(addr1).registerIdentity("Alice", "alice@example.com", "QmHash1");
      await expect(tx)
        .to.emit(digitalIdentity, "IdentityRegistered")
        .withArgs(addr1.address, "Alice", "alice@example.com", "QmHash1");

      const identity = await digitalIdentity.getIdentity(addr1.address);
      expect(identity.name).to.equal("Alice");
      expect(identity.email).to.equal("alice@example.com");
      expect(identity.ipfsHash).to.equal("QmHash1");
      expect(identity.registeredAt).to.be.gt(0);
    });

    it("should revert if identity is already registered", async function () {
      await digitalIdentity.connect(addr1).registerIdentity("Alice", "alice@example.com", "QmHash1");
      await expect(
        digitalIdentity.connect(addr1).registerIdentity("Alice2", "alice2@example.com", "QmHash2")
      ).to.be.revertedWith("Identity already registered");
    });
  });

  describe("updateIdentity", function () {
    beforeEach(async function () {
      await digitalIdentity.connect(addr1).registerIdentity("Alice", "alice@example.com", "QmHash1");
    });

    it("should update identity details successfully", async function () {
      const tx = await digitalIdentity.connect(addr1).updateIdentity("Alice Updated", "alice_updated@example.com", "QmHashUpdated");
      await expect(tx)
        .to.emit(digitalIdentity, "IdentityUpdated")
        .withArgs(addr1.address, "Alice Updated", "alice_updated@example.com", "QmHashUpdated");

      const identity = await digitalIdentity.getIdentity(addr1.address);
      expect(identity.name).to.equal("Alice Updated");
      expect(identity.email).to.equal("alice_updated@example.com");
      expect(identity.ipfsHash).to.equal("QmHashUpdated");
    });

    it("should revert update if identity is not registered", async function () {
      await expect(
        digitalIdentity.connect(addr2).updateIdentity("Bob", "bob@example.com", "QmHashBob")
      ).to.be.revertedWith("Identity not registered");
    });
  });

  describe("getIdentity", function () {
    it("should revert when trying to get identity of an unregistered user", async function () {
      await expect(
        digitalIdentity.getIdentity(addr2.address)
      ).to.be.revertedWith("Identity not found");
    });
  });
});
