import React from 'react';
import ConsentManagerInterface from './components/ConsentManagerInterface';
import IdentityManager from './components/IdentityManager';
import HealthRecordsInterface from './components/HealthRecordsInterface';
import AuditTrail from './components/AuditTrail';

function App() {
  // Replace these with your actual deployed contract addresses
  const consentManagerAddress = '0x63f6DeDc230f192C09b42B0C7e37DCcA514dcc11';
  const digitalIdentityAddress = '0x0x63f6DeDc230f192C09b42B0C7e37DCcA514dcc11';
  const healthRecordsAddress = '0x58670ED9B4cD0A5be0956DA9B615853B4c8eA08a';

  return (
    <div style={{ padding: '20px' }}>
      <h1>Decentralized Healthcare Platform</h1>
      <ConsentManagerInterface contractAddress={consentManagerAddress} />
      <hr />
      <IdentityManager contractAddress={digitalIdentityAddress} />
      <hr/>
      <HealthRecordsInterface contractAddress={healthRecordsAddress} />
      <hr/>
      <AuditTrail 
        consentManagerAddress={consentManagerAddress}
        digitalIdentityAddress={digitalIdentityAddress}
        healthRecordsAddress={healthRecordsAddress}
      />
    </div>
  );
}

export default App;
