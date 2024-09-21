// import react
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
// import s_logo from "../../assets/images/s_logo.png";
import stringy_logo from "../../assets/images/stringy_logo.png";

// Icon imports
import { IoSearch } from "react-icons/io5";
import { TbSquareRoundedPlus2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import RegisterModal from "../modal/RegisterModal";
import { FaRegUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSignIn = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSignedIn(true);
        setShowModal(false);
    }

    return (
        <nav className="header">
            <div className="header-container">
                <Link to='/' className="logo">
                    <img src={stringy_logo} alt="Stringy" />
                </Link>
                <div className="search-bar">
                    <div className="search-bar-container">
                        <input
                            className="search-bar-input"
                            type="text"
                            placeholder="Search Stringy"
                        />
                        <button className="search-button" type="button" aria-label="Search">
                            <IoSearch />
                        </button>
                    </div>
                </div>
                <div className="header-nav">
                    <ul className="header-posts">
                        <li>
                            <button type="button" className="create-post-button">
                                <TbSquareRoundedPlus2 className="create-post-icon" /> Create Post
                            </button>
                        </li>
                        <li>
                            <Link to="/" className="go-home-button">
                                <GoHome />
                            </Link>
                        </li>
                    </ul>
                    <ul className="profile">
                        {isSignedIn ? (
                            <>
                                <li>
                                    <button
                                        className="button-notification"
                                        type="button"
                                        aria-label="Notification"
                                    >
                                        <IoNotificationsOutline />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="button-profile"
                                        type="button"
                                        aria-label="Profile">
                                        <Link to="/profile" className="profile-image">
                                            {/* <img src="#" alt="profile-image" /> */}
                                            <FaRegUserCircle />
                                        </Link>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button className="button-signin" type="button" onClick={handleSignIn}>
                                    Sign In
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <RegisterModal
                isShow={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSignInSubmit} />
        </nav>
    );
};

export default Header;
