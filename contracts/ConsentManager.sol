// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ConsentManager {
    struct Consent {
        bool granted;
        uint256 timestamp;
        string purpose;
    }

    // Mapping from a patient's address to a provider's address and their associated consent details
    mapping(address => mapping(address => Consent)) private consents;

    // Events for logging consent actions
    event ConsentGranted(address indexed patient, address indexed provider, string purpose);
    event ConsentRevoked(address indexed patient, address indexed provider);
    event ConsentUpdated(address indexed patient, address indexed provider, string newPurpose);

    /// @notice Grants consent from the patient to the provider with a specified purpose.
    /// @param provider The address of the data provider.
    /// @param purpose A description of why the provider needs access.
    function grantConsent(address provider, string calldata purpose) external {
        consents[msg.sender][provider] = Consent({
            granted: true,
            timestamp: block.timestamp,
            purpose: purpose
        });
        emit ConsentGranted(msg.sender, provider, purpose);
    }

    /// @notice Revokes previously granted consent.
    /// @param provider The address of the data provider.
    function revokeConsent(address provider) external {
        require(consents[msg.sender][provider].granted, "Consent not granted");
        consents[msg.sender][provider].granted = false;
        emit ConsentRevoked(msg.sender, provider);
    }

    /// @notice Updates the purpose of the granted consent.
    /// @param provider The address of the data provider.
    /// @param newPurpose The new purpose for the consent.
    function updateConsent(address provider, string calldata newPurpose) external {
        require(consents[msg.sender][provider].granted, "Consent not granted");
        consents[msg.sender][provider].purpose = newPurpose;
        emit ConsentUpdated(msg.sender, provider, newPurpose);
    }

    /// @notice Checks if a provider has active consent from a patient.
    /// @param patient The patient's address.
    /// @param provider The provider's address.
    /// @return Boolean indicating whether consent is active.
    function hasConsent(address patient, address provider) external view returns (bool) {
        return consents[patient][provider].granted;
    }
}
