import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Initial from './initial';
import Visualization from './visualization';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Initial />} />
            <Route path="/Visualization*" element={<Visualization/>} />
          </Routes>
    </Router>
  );
}

export default App;
