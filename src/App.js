import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = () => <div>Home Page</div>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
