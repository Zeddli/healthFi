import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConsentManagerInterface from './components/ConsentManagerInterface';
import IdentityManager from './components/IdentityManager';
import HealthRecordsInterface from './components/HealthRecordsInterface';
import AuditTrail from './components/AuditTrail';

function App() {
  // Replace with actual deployed contract addresses
  const consentManagerAddress = '0x63f6DeDc230f192C09b42B0C7e37DCcA514dcc11';
  const digitalIdentityAddress = '0xYourDigitalIdentityContractAddress';
  const healthRecordsAddress = '0xYourHealthRecordsContractAddress';

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Decentralized Healthcare Platform</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/consent">Consent Manager</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/identity">Digital Identity</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/health-records">Health Records</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/audit">Audit Trail</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<div>Welcome to the Decentralized Healthcare Platform!</div>} />
          <Route path="/consent" element={<ConsentManagerInterface contractAddress={consentManagerAddress} />} />
          <Route path="/identity" element={<IdentityManager contractAddress={digitalIdentityAddress} />} />
          <Route path="/health-records" element={<HealthRecordsInterface contractAddress={healthRecordsAddress} />} />
          <Route
            path="/audit"
            element={<AuditTrail
                        consentManagerAddress={consentManagerAddress}
                        digitalIdentityAddress={digitalIdentityAddress}
                        healthRecordsAddress={healthRecordsAddress}
                      />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
