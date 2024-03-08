import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon from the correct package
import './style.css';
import './Login.css';
import Footer from '../Footer/Footer';
import DepContents from './DepContents';

const Interface = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginPopup, setShowLoginPopup] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();

        // Replace these with your preset email and password for login
        const presetEmail = 'admin@office.com';
        const presetPassword = 'admin';

        // Check if the entered email and password match the preset values
        if (email === presetEmail && password === presetPassword) {
            // Perform successful login action here (e.g., store authentication token)
            // For demonstration purposes, let's just navigate to '/Admin' after successful login.
            navigate('/Admin');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const handleLoginButtonClick = () => {
        setShowLoginPopup(true);
    };

    const handlePopupClose = () => {
        setShowLoginPopup(false);
    };

    return (
        <div>
            <header className='header'>
                <img src="/Mediplus_Logo.jpg" alt="Hospital Image" className="ui-logo" />

                <nav className="navbar">

                    <React.Fragment>
                        <a href='#home'>Home</a>
                        <a href='#services'>Services</a>
                        <a href='#about'>About</a>
                        <a href='#departments'>Departments</a>
                        <button className='btn-submit' onClick={handleLoginButtonClick}>Login</button>
                    </React.Fragment>
                </nav>
            </header>

            <section className='home' id='home'>
                <div className='image'>
                    <img src="/hospital.jpg" alt="Hospital Image" className="blend-image" />
                </div>
                <div className='content'>
                    <h3>Stay Safe, Stay Responsible</h3>
                    <p>
                        Hospitals are essential for providing healthcare services to people in need. These facilities are equipped with advanced medical technologies and equipment, allowing medical professionals to provide high-quality medical care to patients.
                    </p>
                    <a href='#contact' className='btn' >
                        Contact us
                        <span><FontAwesomeIcon icon={faArrowRight} /></span>
                    </a>
                </div>
            </section>

            <section className='icon-container'>
                <div className='icons'>
                    <i className='fas fa-user-md'></i>
                    <h3>55+</h3>
                    <p>doctors at work</p>
                </div>

                <div className='icons'>
                    <i className='fas fa-users'></i>
                    <h3>1000+</h3>
                    <p>satisfied patients</p>
                </div>

                <div className='icons'>
                    <i className='fas fa-procedures'></i>
                    <h3>220+</h3>
                    <p>bed facility</p>
                </div>

                <div className='icons'>
                    <i className='fas fa-hospital'></i>
                    <h3>10+</h3>
                    <p>hospitals available</p>
                </div>
            </section>

            <section className='services' id='services'>
                <h1 className='heading'>Our <span>Services</span></h1>

                <div className='box-container'>
                    <div className='box'>
                        <i className='fas fa-notes-medical'></i>
                        <h3>Free checkups</h3>
                        <p> This free health checkup includes weight and height check-ups, temperature evaluation, blood pressure monitoring, blood sugar check-ups</p>
                        <a href='#' className='btn'>
                            Learn more
                            <span><FontAwesomeIcon icon={faArrowRight} /></span>
                        </a>
                    </div>

                    <div className='box'>
                        <i className='fas fa-ambulance'></i>
                        <h3>24/7 Ambulance services</h3>
                        <p> Emergency medical services-EMS, also known as ambulance services or paramedic services, are emergency services that provide urgent pre-hospital treatment</p>
                        <a href='#' className='btn'>Learn more <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </div>

                    <div className='box'>
                        <i className='fas fa-user-md'></i>
                        <h3>Expert doctors</h3>
                        <p> When you need answers, Best Doctors can help. Get an Expert Medical Opinion from one of our world-renowned specialists so you can have the answers</p>
                        <a href='#' className='btn'>Learn more <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </div>

                    <div className='box'>
                        <i className='fas fa-pills'></i>
                        <h3>Medicines</h3>
                        <p> Medicines can treat diseases and improve your health. If you are like most people, you need to take medicine at some point in your life.</p>
                        <a href='#' className='btn'>Learn more <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </div>

                    <div className='box'>
                        <i className='fas fa-procedures'></i>
                        <h3>Bed facility</h3>
                        <p> A hospital bed or hospital cot is a bed specially designed for hospitalized patients or others in need of some form of health care</p>
                        <a href='#' className='btn'>Learn more <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </div>

                    <div className='box'>
                        <i className='fas fa-heartbeat'></i>
                        <h3>Total care</h3>
                        <p> Total patient care is a nursing model where one nurse provides total care to a single patient or a group of patients during his/her shift.</p>
                        <a href='#' className='btn'>Learn more <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </div>
                </div>
            </section>
            {showLoginPopup && (
                <div className='login-popup'>
                    <div className='login-popup-content'>
                        <button className='close-popup' onClick={handlePopupClose}>
                            Close
                        </button>
                        <div className='login-section'>
                            <div className='main'>
                                <section className='login-section'>
                                    <div className="container">
                                        <img src="/Mediplus_Logo.jpg" alt="Hospital Image" className="login-logo" />
                                        <h2 className="login-heading">Login</h2>
                                        <form onSubmit={handleSubmit} className="login-form">
                                            <label className="label">Email:</label>
                                            <input
                                                type="email"
                                                placeholder="Abc@example.com"
                                                className="input-email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <label className="label">Password:</label>
                                            <input
                                                type="password"
                                                placeholder="Type password here"
                                                className="input-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <button type="submit" className="btn-submit">Submit</button>

                                            <p className="forgot-password">Forgot password</p>
                                        </form>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )};

            <DepContents />
            <div className='footer'><Footer /></div>

        </div>
    );
}

export default Interface;
