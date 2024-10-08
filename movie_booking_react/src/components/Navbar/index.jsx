import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Navbar.css';
import axios from 'axios';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Endpoints from '../../api/Endpoints';

const Navbar = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            setLoginStatus(true);
            fetchUserProfile()
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const user_id = localStorage.getItem('user_id');
            const access_token = localStorage.getItem('access_token');
            const response = await axios.get(`${Endpoints.USERS}${user_id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            if (response.status === 200) {
                const user = response.data;
                setIsAdmin(user.is_staff && user.is_superuser);
            } else {
                console.error('Error fetching user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile', error);
        }
    };

    const onLogoutHandler = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('favorite_cinemas');
        setLoginStatus(false);
        setIsAdmin(false);
        navigate('/login');
    };

    return (
        <nav className={`header navbar fixed-top navbar-dark navbar-expand-sm navbar-light}`}>
            <div className='navbar-brand'>
                <Link title='Home' to="/"><img className='hero-logo' src={logo} alt="logo" /></Link>
            </div>
            <button
                className="navbar-toggler"
                type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="nav-links px-2">
                    {
                        loginStatus ? (
                            <>
                                <div className="account-option">
                                    <div className="tickets-btn">
                                        <button onClick={() => navigate('/tickets')} className="btn btn-outline-warning py-1 px-2">Tickets</button>
                                    </div>
                                    : <></>
                                    <div className='admin-option mr-auto'>
                                        {isAdmin && <Link className="btn btn-outline-light py-1 px-2 " to="/add-movie">Add Movie</Link>}
                                    </div>
                                </div>

                                <div className='account-btn-container'>

                                    <Link className="mr-2 text-white" to="/profile" title='Profile'>
                                        <CgProfile size="38px" />
                                    </Link>
                                    <button className="join-btn d-flex align-item-center p-2" title='Logout' onClick={onLogoutHandler}>
                                        <RiLogoutCircleRLine size="20px" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link className="navlink mr-3 text-white" to="/login">Login</Link>
                                <Link className="join-btn hide-us" to="/signup">Join <span>Us</span></Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
