import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConsentManagerInterface from './components/ConsentManagerInterface';
import IdentityManager from './components/IdentityManager';
import HealthRecordsInterface from './components/HealthRecordsInterface';
import AuditTrail from './components/AuditTrail';
import Layout from './Layout';
import HomePage from './components/HomePage'; // Updated import path

function App() {
  // Replace with actual deployed contract addresses
  const consentManagerAddress = '0x63f6DeDc230f192C09b42B0C7e37DCcA514dcc11';
  const digitalIdentityAddress = '0xYourDigitalIdentityContractAddress';
  const healthRecordsAddress = '0xYourHealthRecordsContractAddress';

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
      </Layout>
    </Router>
  );
}

export default App;
