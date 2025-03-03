import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ConsentManagerAbi from '../abis/ConsentManager.json';
import DigitalIdentityAbi from '../abis/DigitalIdentity.json';
import HealthRecordsAbi from '../abis/HealthRecords.json';

function AuditTrail({ consentManagerAddress, digitalIdentityAddress, healthRecordsAddress }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Override ENS resolution
        provider.resolveName = async (name) => {
          if (ethers.isAddress(name)) return name;
          return null;
        };

        // Create contract instances
        const consentManager = new ethers.Contract(consentManagerAddress, ConsentManagerAbi, provider);
        const digitalIdentity = new ethers.Contract(digitalIdentityAddress, DigitalIdentityAbi, provider);
        const healthRecords = new ethers.Contract(healthRecordsAddress, HealthRecordsAbi, provider);

        // Setup event listeners for each contract
        // ConsentManager events
        consentManager.on("ConsentGranted", (patient, provider, purpose, event) => {
          addEvent({
            type: "ConsentGranted",
            patient,
            provider,
            detail: purpose,
            blockNumber: event.blockNumber,
          });
        });

        consentManager.on("ConsentRevoked", (patient, provider, event) => {
          addEvent({
            type: "ConsentRevoked",
            patient,
            provider,
            detail: "",
            blockNumber: event.blockNumber,
          });
        });

        consentManager.on("ConsentUpdated", (patient, provider, newPurpose, event) => {
          addEvent({
            type: "ConsentUpdated",
            patient,
            provider,
            detail: newPurpose,
            blockNumber: event.blockNumber,
          });
        });

        // DigitalIdentity events
        digitalIdentity.on("IdentityRegistered", (user, name, email, ipfsHash, event) => {
          addEvent({
            type: "IdentityRegistered",
            patient: user,
            detail: `Name: ${name}, Email: ${email}, IPFS: ${ipfsHash}`,
            blockNumber: event.blockNumber,
          });
        });

        digitalIdentity.on("IdentityUpdated", (user, name, email, ipfsHash, event) => {
          addEvent({
            type: "IdentityUpdated",
            patient: user,
            detail: `Updated - Name: ${name}, Email: ${email}, IPFS: ${ipfsHash}`,
            blockNumber: event.blockNumber,
          });
        });

        // HealthRecords events
        healthRecords.on("RecordAdded", (recordId, patient, ipfsHash, timestamp, event) => {
          addEvent({
            type: "RecordAdded",
            patient,
            detail: `Record ID: ${recordId} IPFS: ${ipfsHash}`,
            blockNumber: event.blockNumber,
          });
        });
      }
    }

    function addEvent(newEvent) {
      setEvents((prev) => [newEvent, ...prev]);
    }

    init();

    // Cleanup: remove event listeners on component unmount
    return () => {
      // Removing listeners is recommended; for brevity, not included here.
    };
  }, [consentManagerAddress, digitalIdentityAddress, healthRecordsAddress]);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h2>Audit Trail</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map((e, index) => (
            <li key={index}>
              <strong>{e.type}</strong> | Block: {e.blockNumber} | Patient: {e.patient} | {e.provider ? `Provider: ${e.provider} | ` : ''}{' '}
              {e.detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuditTrail;
