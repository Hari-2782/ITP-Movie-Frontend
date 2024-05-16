import React, { useState, useEffect, useRef } from 'react';

const PaymentSlipForm = () => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null); // Create a ref for the file input

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('http://localhost:8000/user/getuser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const data = await res.json();
                setUserId(data.data._id);
                setEmail(data.data.email);
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, []);

    const handleFileChange = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const res = await fetch('http://localhost:8000/slip/upload', {
                method: 'POST',
                body: formData,
                'Content-Type': 'multipart/form-data'
            });
            // Handle the response as needed
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                alert("Authentication failed. Please log in again.");
            } else {
                alert("Error while uploading image.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('userId', userId);
        formData.append('email', email);
        formData.append('PhotoFileName', fileInputRef.current.files[0].name);
        const jsonData = {
            userId: userId,
            email: email,
            PhotoFileName:  fileInputRef.current.files[0].name // You may need to adjust this based on how your server expects the file
        };
    
        try {
            const response = await fetch('http://localhost:8000/slip/slips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error uploading payment slip');
            console.error('Error uploading payment slip:', error);
        }
    };
    
    return (
        <div>
            <h2>Upload Payment Slip</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID: {userId}</label>
                </div>
                <div>
                    <label>Email: {email}</label>
                </div>
                <div>
                    <label>Payment Slip:</label>
                    <input type="file" onChange={handleFileChange} ref={fileInputRef} /> {/* Assign the ref to the file input */}
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PaymentSlipForm;
