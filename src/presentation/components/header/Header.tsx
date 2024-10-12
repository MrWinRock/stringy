import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { decodeToken } from "./../../../utils/authUtil";
import { getProfilePicture } from "../../../services/uploadService"; // Import the existing function

// import s_logo from "../../assets/images/s_logo.png";
import stringy_logo from "../../assets/images/stringy_logo.png";

// Icon imports
import { IoSearch } from "react-icons/io5";
import { TbSquareRoundedPlus2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline, IoSettingsOutline, IoLogInOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

// import components
import RegisterModal from "../modal/RegisterModal";

const Header: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState("Username");
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

    const registerModalRef = React.useRef<any>();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const signedIn = localStorage.getItem("signedIn") === 'true';
        setIsSignedIn(signedIn);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            setUsername(decodedToken.username);
            fetchProfilePicture(decodedToken.userId);
        }
    }, [token]);

    const fetchProfilePicture = async (userId: number) => {
        try {
            const url = await getProfilePicture(userId);
            setProfilePictureUrl(url);
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }
    };

    const handleSignIn = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSignedIn(true);
        localStorage.setItem("signedIn", 'true');
        setShowModal(false);
    }

    const handleSignOut = () => {
        setIsSignedIn(false);
        localStorage.removeItem("signedIn");
        localStorage.removeItem("token");

        if (registerModalRef.current) {
            registerModalRef.current.handleSignOut();
        }
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
                            <Link to="/create-post" className="create-post-button">
                                <TbSquareRoundedPlus2 className="create-post-icon" color="white" /> <p>Create Post</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="go-home-button">
                                <GoHome color="white" />
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
                                        <IoNotificationsOutline color="white" />
                                    </button>
                                </li>
                                <li
                                    className="profile-dropdown"
                                    onMouseEnter={() => setShowDropdown(true)}
                                    onMouseLeave={() => setShowDropdown(false)}
                                >
                                    <button
                                        className="button-profile"
                                        type="button"
                                        aria-label="Profile">
                                        <Link to="/profile" className="profile-image">
                                            {profilePictureUrl ? (
                                                <img src={profilePictureUrl} alt="Profile" className="profile-picture" />
                                            ) : (
                                                <FaRegUserCircle color="white" />
                                            )}
                                        </Link>
                                    </button>
                                    {showDropdown && (
                                        <ul className="profile-dropdown">
                                            <li className="dropdown-profile">
                                                <Link to="/profile" className="dropdown-profile-link">
                                                    {profilePictureUrl ? (
                                                        <img src={profilePictureUrl} alt="Profile" className="dropdown-profile-picture" />
                                                    ) : (
                                                        <FaRegUserCircle className="dropdown-images" />
                                                    )}
                                                    <p className="dropdown-texts">{username}</p>
                                                </Link>
                                            </li>
                                            <li className="dropdown-setting">
                                                <Link to="/setting" className="dropdown-setting-link"><IoSettingsOutline className="dropdown-images" /><p className="dropdown-texts">Settings</p></Link>
                                            </li>
                                            <li className="dropdown-signout">
                                                <button type="button" onClick={handleSignOut} className="dropdown-signout-button">
                                                    <IoLogInOutline className="dropdown-images" /><p className="dropdown-texts">Sign Out</p>
                                                </button>
                                            </li>
                                        </ul>
                                    )}
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
                onSubmit={handleSignInSubmit}
            />

        </nav>
    );
};

export default Header;