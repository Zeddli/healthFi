// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HealthRecords {
    struct Record {
        address patient;
        string ipfsHash;
        uint256 timestamp;
    }

    // Record id => Record mapping
    mapping(uint256 => Record) public records;
    uint256 public recordCount;

    event RecordAdded(uint256 indexed recordId, address indexed patient, string ipfsHash, uint256 timestamp);

    /// @notice Add a new health record
    /// @param ipfsHash The IPFS hash where the encrypted health record is stored
    function addRecord(string calldata ipfsHash) external {
        recordCount++;
        records[recordCount] = Record({
            patient: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp
        });
        emit RecordAdded(recordCount, msg.sender, ipfsHash, block.timestamp);
    }

    /// @notice Retrieve a health record by its ID
    /// @param recordId The ID of the record
    /// @return The Record struct containing patient, ipfsHash, and timestamp
    function getRecord(uint256 recordId) external view returns (Record memory) {
        require(recordId > 0 && recordId <= recordCount, "Record does not exist");
        return records[recordId];
    }
}
