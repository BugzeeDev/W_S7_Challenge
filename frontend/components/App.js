import React from 'react'
import Home from './Home'
import Form from './Form'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/order">Order</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Form />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

