import React from 'react'
import pizza from './images/pizza.jpg'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate(); // {{ edit_1 }}

  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      <img 
        alt="order-pizza" 
        style={{ cursor: 'pointer' }} 
        src={pizza} 
        onClick={() => navigate('/order')} // {{ edit_2 }}
      />
    </div>
  )
}

export default Home
