import * as React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DigitalIdentityAbi from '../abis/DigitalIdentity.json';

function IdentityManager({ contractAddress }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);

        const signer = await provider.getSigner();
        const digitalIdentity = new ethers.Contract(
          contractAddress,
          DigitalIdentityAbi,
          signer
        );
        setContract(digitalIdentity);
      } else {
        alert('Please install MetaMask!');
      }
    }
    init();
  }, [contractAddress]);

  const registerIdentity = async () => {
    try {
      const tx = await contract.registerIdentity(name, email, ipfsHash);
      await tx.wait();
      alert('Identity registered!');
    } catch (err) {
      console.error(err);
      alert('Error registering identity.');
    }
  };

  const updateIdentity = async () => {
    try {
      const tx = await contract.updateIdentity(name, email, ipfsHash);
      await tx.wait();
      alert('Identity updated!');
    } catch (err) {
      console.error(err);
      alert('Error updating identity.');
    }
  };

  const fetchIdentity = async () => {
    try {
      const id = await contract.getIdentity(account);
      setIdentity(id);
    } catch (err) {
      console.error(err);
      alert('Error fetching identity.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Digital Identity Manager</h2>
      <p>Your account: {account}</p>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="IPFS Hash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={registerIdentity}>Register Identity</button>
        <button onClick={updateIdentity} style={{ marginLeft: '10px' }}>
          Update Identity
        </button>
        <button onClick={fetchIdentity} style={{ marginLeft: '10px' }}>
          Fetch Identity
        </button>
      </div>
      {identity && (
        <div style={{ marginTop: '20px' }}>
          <h3>My Identity</h3>
          <p>Name: {identity.name}</p>
          <p>Email: {identity.email}</p>
          <p>IPFS Hash: {identity.ipfsHash}</p>
          <p>Registered At: {new Date(identity.registeredAt.toNumber() * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default IdentityManager;
