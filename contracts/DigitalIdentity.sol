// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DigitalIdentity {
    struct Identity {
        string name;
        string email;
        string ipfsHash; // Points to off‑chain documents or metadata
        uint256 registeredAt;
    }

    // Maps a user's address to their identity details
    mapping(address => Identity) private identities;

    // Events for identity registration and updates
    event IdentityRegistered(address indexed user, string name, string email, string ipfsHash);
    event IdentityUpdated(address indexed user, string name, string email, string ipfsHash);

    /// @notice Register your digital identity
    /// @param name Your name
    /// @param email Your email address
    /// @param ipfsHash IPFS hash referencing additional identity data
    function registerIdentity(
        string calldata name,
        string calldata email,
        string calldata ipfsHash
    ) external {
        require(bytes(identities[msg.sender].name).length == 0, "Identity already registered");
        identities[msg.sender] = Identity({
            name: name,
            email: email,
            ipfsHash: ipfsHash,
            registeredAt: block.timestamp
        });
        emit IdentityRegistered(msg.sender, name, email, ipfsHash);
    }

    /// @notice Update your digital identity details
    /// @param name Your updated name
    /// @param email Your updated email
    /// @param ipfsHash Updated IPFS hash for additional data
    function updateIdentity(
        string calldata name,
        string calldata email,
        string calldata ipfsHash
    ) external {
        require(bytes(identities[msg.sender].name).length != 0, "Identity not registered");
        identities[msg.sender] = Identity({
            name: name,
            email: email,
            ipfsHash: ipfsHash,
            registeredAt: identities[msg.sender].registeredAt
        });
        emit IdentityUpdated(msg.sender, name, email, ipfsHash);
    }

    /// @notice Retrieve the identity details of a user
    /// @param user Address of the user
    /// @return The Identity struct for the given user
    function getIdentity(address user) external view returns (Identity memory) {
        require(bytes(identities[user].name).length != 0, "Identity not found");
        return identities[user];
    }
}
