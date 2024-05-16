import React, { useState } from 'react';
import { toast } from 'react-toastify';
import logo from '../utils/asset/logo.png';
import './auth.css';
import { Link } from 'react-router-dom';
export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        setErrors({});

        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.name) {
            validationErrors.name = 'Name is required';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch('http://localhost:8000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.ok) {
                    toast(response.message, {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 2000
                    })
                    window.location.href = '/login'
        // Reset form
        setFormData({
            name: '',
            email: '',
        })
    } else {
        toast(response.message, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000
        });
    }
})
.catch((error) => {
    toast(error.message, {
        type: 'error',
        position: 'top-right',
        autoClose: 2000
    });
})
}
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
                        onSubmit={handleSubmit}
                    >
                <div className="forminput_cont">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="formerror">{errors.name}</span>}
                </div>
                <div className="forminput_cont">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="formerror">{errors.email}</span>}
                </div>
                <button className="main_button" type="submit">Register</button>
                <p className='authlink'>
                    Already have an account? <Link to="/login">login</Link>
                    </p>
            </form>
           
        </div>
        </div>
        </div>
    );
}
