import React from 'react';
import './Home.css';
import Header from './Header';
import backgroundImage from './assets/world_gif.gif'; // Ensure the path is correct

const HomePage = () => {
  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="con">
        <Header />
      </div>
      <div className="content">
        <h1 className="animated-heading">Welcome to Global Management</h1>
      </div>
      <footer className="footer">
       
      </footer>
      <div className="end">
        <p>© 2024 GlobalManagement Website</p>
      </div>
    </div>
  );
};

export default HomePage;
