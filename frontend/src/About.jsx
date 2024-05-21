import React from 'react';
import Header from './Header';
import './About.css';
import './Continent.css';

const About = () => {
  return (
    <div>
       <div className='con' style={{  padding: '20px', marginBottom: '20px' }}>
        <Header />
        </div>
      <div className="about-container">
      <div className="glitter"></div> 
        <h1 className="animate__animated animate__fadeInDown">ABOUT US!</h1>
        <p className='para animate__animated animate__fadeIn'>GlobalEdge Management is a powerful full-stack application dedicated to providing comprehensive insights into global metrics across various continents and countries. Our mission is to deliver accurate, up-to-date data to aid in research, policy making, business analysis, and public awareness.</p>
        <div className='p2 animate__animated animate__fadeInUp'>
          <div className='p1'>
            <h2>Our Features:</h2>
            <ul>
              <li>
                <strong>Continent Overview:</strong> Explore the demographic details of each continent, including population statistics and the total number of countries.
              </li>
              <li>
                <strong>Unemployment Insights:</strong> Gain detailed insights into unemployment trends with data on total unemployment, youth unemployment, and long-term unemployment across different countries.
              </li>
              <li>
                <strong>Country Development:</strong> Analyze key development indicators such as technology adoption rates, education levels, tourism arrivals, and overall development status for various countries.
              </li>
            </ul>
          </div>
          <div className='p1'>
            <h2>Our Vision:</h2>
            <p>
              At GlobalEdge Management, we believe in the power of data to drive positive change. By providing detailed and accessible global metrics, we aim to empower individuals, organizations, and governments to make informed decisions that contribute to sustainable development and economic growth.
            </p>
          </div>
          <div className='p1'>
            <h2>Our Team:</h2>
            <p>
              Our team is composed of passionate developers, data analysts, and researchers committed to delivering a reliable and user-friendly platform. We are dedicated to continuously updating our database to ensure the accuracy and relevance of the information we provide.
            </p>
          </div>
          <div className='p1'>
            <h2>Get in Touch:</h2>
            <p>
              We value your feedback and are always here to help. If you have any questions, suggestions, or need support, please feel free to contact us at [contact information].
            </p>
          </div>
        </div>
        <p className='para animate__animated animate__fadeIn'>Thank you for choosing GlobalEdge Management. Together, we can make a difference by understanding and addressing global challenges.</p>
      </div>
    </div>
  );
};

export default About;
