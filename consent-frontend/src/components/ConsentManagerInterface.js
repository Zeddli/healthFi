import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ConsentManagerAbi from '../abis/ConsentManager.json';

function ConsentManagerInterface({ contractAddress }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [providerAddress, setProviderAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [consentStatus, setConsentStatus] = useState(null);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        // Using ethers v6's BrowserProvider
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Override ENS resolution
        provider.resolveName = async (name) => {
          if (ethers.isAddress(name)) return name;
          return null;
        };
        
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);

        const signer = await provider.getSigner();
        const consentManager = new ethers.Contract(
          contractAddress,
          ConsentManagerAbi,
          signer
        );
        setContract(consentManager);
      } else {
        alert('Please install MetaMask!');
      }
    }
    init();
  }, [contractAddress]);

  const grantConsent = async () => {
    try {
      const tx = await contract.grantConsent(providerAddress, purpose);
      await tx.wait();
      alert('Consent granted!');
    } catch (err) {
      console.error(err);
      alert('Error granting consent.');
    }
  };

  const updateConsent = async () => {
    try {
      const tx = await contract.updateConsent(providerAddress, purpose);
      await tx.wait();
      alert('Consent updated!');
    } catch (err) {
      console.error(err);
      alert('Error updating consent.');
    }
  };

  const revokeConsent = async () => {
    try {
      const tx = await contract.revokeConsent(providerAddress);
      await tx.wait();
      alert('Consent revoked!');
    } catch (err) {
      console.error(err);
      alert('Error revoking consent.');
    }
  };

  const checkConsent = async () => {
    try {
      const status = await contract.hasConsent(account, providerAddress);
      setConsentStatus(status);
    } catch (err) {
      console.error(err);
      alert('Error checking consent.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>Consent Manager Interface</h2>
      <p>Your account: {account}</p>
      <div>
        <input
          type="text"
          placeholder="Provider Address"
          value={providerAddress}
          onChange={(e) => setProviderAddress(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={grantConsent}>Grant Consent</button>
        <button onClick={updateConsent} style={{ marginLeft: '10px' }}>Update Consent</button>
        <button onClick={revokeConsent} style={{ marginLeft: '10px' }}>Revoke Consent</button>
        <button onClick={checkConsent} style={{ marginLeft: '10px' }}>Check Consent</button>
      </div>
      {consentStatus !== null && (
        <p>Consent Active: {consentStatus ? 'Yes' : 'No'}</p>
      )}
    </div>
  );
}

export default ConsentManagerInterface;
