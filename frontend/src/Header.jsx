import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const location = useLocation();

    return (
        <div className="header-container">
            <div className="header" style={{ backgroundColor: "black", borderBottom: "2px solid #09ee09" }}>
                <nav>
                    <ul>
                        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                        <li><Link to="/continent" className={location.pathname === '/continent' ? 'active' : ''}>Continent</Link></li>
                        <li><Link to="/country-statistics" className={location.pathname === '/country-statistics' ? 'active' : ''}>Country Statistics</Link></li>
                        <li><Link to="/unemployment" className={location.pathname === '/unemployment' ? 'active' : ''}>Unemployment</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
