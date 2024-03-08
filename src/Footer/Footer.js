import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-item">
                        <h4 className='text-head'>Location</h4>
                        <p className='text-p'>Mediplus Hospital , Hospital Street, City, Country</p>
                    </div>
                    <div className="footer-item">
                        <h4>Social Links</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                    <div className="footer-item">
                        <h4 className='text-head' id='contact'>Contact</h4>
                        <p className='text-p'>Email: Mediplushospital@hospital.com</p>
                        <p className='text-p'>Phone: +123456789</p>
                    </div>
                </div>
            </div>
            <h4 className='text-head'>&copy; 2023 Made by Aswin S. All rights reserved</h4>
        </footer>
    );
};

export default Footer;
