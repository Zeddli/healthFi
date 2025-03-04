import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        {/* Add your other routes here */}
      </Routes>
    </div>
  );
}

export default App;
