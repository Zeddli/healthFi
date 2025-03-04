import * as React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HealthRecordsAbi from '../abis/HealthRecords.json';
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';

function HealthRecordsInterface({ contractAddress }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [recordData, setRecordData] = useState('');
  const [recordHash, setRecordHash] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [recordId, setRecordId] = useState('');
  const [isFetching, setIsFetching] = useState(false); // new state for loading indication

  // Configure your IPFS client
  const ipfsClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

  // Replace with your encryption key (in practice, use a secure method to store/manage keys)
  const encryptionKey = "my-secret-key";

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        provider.resolveName = async (name) => {
          if (ethers.isAddress(name)) return name;
          return null;
        };
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);

        const signer = await provider.getSigner();
        const healthRecords = new ethers.Contract(contractAddress, HealthRecordsAbi, signer);
        setContract(healthRecords);
      } else {
        alert('Please install MetaMask!');
      }
    }
    init();
  }, [contractAddress]);

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, encryptionKey).toString();
  };

  const decryptData = (cipherText) => {
    const bytes  = CryptoJS.AES.decrypt(cipherText, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const addRecord = async () => {
    try {
      // Encrypt the record data
      const encryptedData = encryptData(recordData);
      // Upload encrypted data to IPFS
      const added = await ipfsClient.add(encryptedData);
      const ipfsHash = added.path;
      setRecordHash(ipfsHash);
      
      // Call the contract to add the record
      const tx = await contract.addRecord(ipfsHash);
      await tx.wait();
      alert('Record added to blockchain!');
    } catch (err) {
      console.error(err);
      alert('Error adding record.');
    }
  };

  const fetchRecord = async () => {
    setIsFetching(true); // Set loading state to true
    try {
      const record = await contract.getRecord(recordId);
      
      // Fetch the record data from IPFS
      const ipfsResult = ipfsClient.cat(record.ipfsHash);
      let fetchedData = '';
      for await (const chunk of ipfsResult) {
        fetchedData += new TextDecoder().decode(chunk);
      }
      
      // Decrypt the data
      const decrypted = decryptData(fetchedData);
      setDecryptedData(decrypted);
    } catch (err) {
      console.error(err);
      alert('Error fetching record.');
    } finally {
      setIsFetching(false); // Set loading state to false
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Health Records Interface</h2>
      <p>Your account: {account}</p>
      <div>
        <textarea
          rows="4"
          placeholder="Enter your health record data..."
          value={recordData}
          onChange={(e) => setRecordData(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={addRecord}>Add Health Record</button>
      </div>
      <hr />
      <div>
        <input
          type="text"
          placeholder="Record ID to fetch"
          value={recordId}
          onChange={(e) => setRecordId(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button onClick={fetchRecord} disabled={isFetching}>Fetch Record</button>
        {isFetching && <p>Loading...</p>} {/* Display loading indicator */}
      </div>
      {recordHash && (
        <div style={{ marginTop: '20px' }}>
          <p>Record added. IPFS Hash: {recordHash}</p>
        </div>
      )}
      {decryptedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Decrypted Record Data</h3>
          <p>{decryptedData}</p>
        </div>
      )}
    </div>
  );
}

export default HealthRecordsInterface;
