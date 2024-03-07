import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Interface from './Components/Interface';
import AdminPanel from './Admin/AdminPanel';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Interface />} />
        <Route path='/Admin' element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
