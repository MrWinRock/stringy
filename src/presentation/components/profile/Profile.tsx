// src/presentation/components/profile/Profile.tsx
import "./Profile.css";
import { useState, useEffect } from "react";
import { getProfilePicture } from "../../../services/uploadService";
import { decodeToken } from "../../../utils/authUtil";

// icons import
import { FaRegUserCircle } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";

const Profile: React.FC = () => {
    const [username, setUsername] = useState<string>("Username");
    const [communityJoined, setCommunityJoined] = useState<number>(0);
    const [bio, setBio] = useState<string>(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel lectus posuere, aliquet augue in, convallis arcu."
    );
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
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

    return (
        <div className="profile-page">
            <div className="profile-page-container">
                <div className="user-profile">
                    <div className="user-profile-container">
                        <div className="user-image">
                            {profilePictureUrl ? (
                                <img src={profilePictureUrl} alt="Profile" className="user-profile-picture" />
                            ) : (
                                <FaRegUserCircle className="user-profile-img" />
                            )}
                            <button type="button" className="user-change-image-bg" title="Change profile image">
                                <BsCamera className="user-change-profile-img" />
                            </button>
                        </div>
                        <div className="user-content">
                            <h2 className="profile-username">{username}</h2>
                            <p className="profile-community">{communityJoined} Community joined.</p>
                            <p className="profile-bio">
                                {bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;