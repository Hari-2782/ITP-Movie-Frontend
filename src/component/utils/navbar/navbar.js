import React, { useState } from 'react';
import { BiSearch, BiUserCircle } from 'react-icons/bi';

import { Link } from 'react-router-dom'; // Import Link for internal navigation
import logo from '../asset/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = React.useState(null)
    
    const handleLogout = () => {
        fetch('http://localhost:8000/user/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => {
           
            return res.json();
        })
        .then((response) => {
            console.log(response);
            window.location.href = "/login";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "/";
        });
    };
    const getuser = async () => {

        fetch('http://localhost:8000/user/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const[color,setColor]=useState(false)
    const changecolor =  () => {

        if(window.scrollY>=90){
            setColor(true)
        }else{
            setColor(false)
        }
    }
window.addEventListener('scroll',changecolor)

    const checkLogin = async () => {
    
        fetch('http://localhost:8000/user/checklogin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                if(response.ok){
                    setIsLoggedIn(true)
                }
                else{
                    setIsLoggedIn(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLoggedIn(false)
            })
    }
    React.useEffect(() => {
        checkLogin()
        getuser()
    }, [])
    return (
        <div className="header">
        <nav className={color ? 'nav nav-bg':'nav'}>
            <div className='left'>
                <img src={logo} alt="logo" onClick={() => window.location.href = "/"} />
                <div className='searchbox'>
                    <BiSearch className='searchbtn' />
                    <input type="text" placeholder="Search For a Movie" />
                </div>
            </div>
            <div className='center'>
            <Link to="/" className='linkstylenone'>Home</Link>
            <Link to="/movie" className='linkstylenone'>Movies</Link>
                <Link to="offer" className='linkstylenone'>Offers</Link>
               
            </div>
            <div className='right'>
             
                {isLoggedIn ? (
                    <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                ) : (
                    <button className='theme_btn1 linkstylenone' onClick={() => window.location.href = "/login"}>
                        Login
                    </button>
                )}
                {isLoggedIn && (
                    <Link to="/profile" className='linkstylenone'>
                        <BiUserCircle className='theme_icon1' />
                    </Link>
                )}
            </div>
        </nav>
        </div>
    );
};

export default Navbar;
