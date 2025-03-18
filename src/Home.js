import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
<div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My Three.js Practice Projects</h1>
      <p>Welcome! Here are some of my experiments with Three.js in React.</p>
      <ul style={{ listStyle: 'none', padding: 0,display:'flex',flexDirection:'column',gap:'20px' }}>
        <li><Link to="/project1">Project 1 - 3D Cubes</Link></li>
        <li><Link to="/project2">Project 2 - Minecraft Diamond Block</Link></li>
        <li><Link to="/project3">Project 3 - 3D Text</Link></li>
        <li><Link to="/project4">Project 4 - 360 Degree Scene</Link></li>
        <li><Link to="/project5">Project 5 - Earth and Moon</Link></li>
        <li><Link to="/project6">Project 6 - Hanted Cemetery</Link></li>
        <li><Link to="/project7">Project 7 - Rings</Link></li>
        <li><Link to="/project8">Project 8 - Galaxy Generator</Link></li>
        <li><Link to="/project9">Project 9 - 360 Degree Scene</Link></li>
      </ul>
    </div>
  )
}

export default Home
