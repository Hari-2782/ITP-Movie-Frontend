import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../utils/asset/logo.png';
import './auth.css';


const Login = () => {
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
      const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'otp') setOtp(value);
        // if (name === 'password') setPassword(value);
    };

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://itp-movie-backend.vercel.app/user/sendOTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setStep(2); // Move to step 2 to enter OTP
                toast.success('OTP sent successfully');
            } else {
                toast.error(data.message,{
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000 
                });
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Failed to send OTP',{
                type: 'error',
                position: 'top-right',
                autoClose: 2000
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // const validationErrors = {};
        // if (email) {
        //     validationErrors.email = 'Email is required';
        // }
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }

        try {
            const response = await fetch(`https://itp-movie-backend.vercel.app/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
               
                toast.success('Login successful',{
                    type: 'success',
                    position: 'top-right',
                    autoClose: 2000
                });
                window.location.href = "/";
            } else {
                console.error('Error verifying OTP:');
                toast.error(data.message,{
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify OTP',{
                type: 'error',
                position: 'top-right',
                autoClose: 2000
            });
        }
    };

    return (
        
        <div className="authout">
            <div className="authin">
                <div className="left">
                    <img src={logo} alt="" className="img" />
                </div>
                <div className="right">
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onSubmit={handleLogin}
                    >
                        {step === 1 && (
                            <>
                                <div className="forminput_cont">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="formerror">{errors.email}</span>}
                                </div>
                                <button type="submit" onClick={handleRequestOTP} className="main_button">
                                    Send OTP
                                </button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="forminput_cont">
                                    <label>OTP</label>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        name="otp"
                                        value={otp}
                                        onChange={handleChange}
                                    />
                                    {errors.otp && <span className="formerror">{errors.otp}</span>}
                                </div>
                                <button type="submit" className="main_button">
                                    Login
                                </button>
                            </>
                        )}
                       
                        <p className="authlink">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
