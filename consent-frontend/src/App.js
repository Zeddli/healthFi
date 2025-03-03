import React from 'react';
import ConsentManagerInterface from './components/ConsentManagerInterface';
import IdentityManager from './components/IdentityManager';

function App() {
  // Replace these with your actual deployed contract addresses
  const consentManagerAddress = '0x63f6DeDc230f192C09b42B0C7e37DCcA514dcc11';
  const digitalIdentityAddress = '0x0x63f6DeDc230f192C09b42B0C7e37DCcA514dcc11';

  return (
    <div style={{ padding: '20px' }}>
      <h1>Decentralized Healthcare Platform</h1>
      <ConsentManagerInterface contractAddress={consentManagerAddress} />
      <hr />
      <IdentityManager contractAddress={digitalIdentityAddress} />
    </div>
  );
}

export default App;
