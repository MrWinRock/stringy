import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import { getProfilePicture } from "../../../services/uploadService";
import { decodeToken } from "../../../utils/authUtil";
import { uploadService } from "./../../../services/uploadService";

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

    const [image, setImage] = useState<File | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    const token = localStorage.getItem("token");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (token) {
            const decodedToken = decodeToken(token);
            setUsername(decodedToken.username);
            setUserId(decodedToken.userId);
            fetchProfilePicture(decodedToken.userId);
        } else {
            console.log("No token found in localStorage");
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

    const handleImageUpload = async () => {
        if (image && userId !== null) {
            try {
                const imageUrl = await uploadService(image, userId);
                setProfilePictureUrl(imageUrl);
                console.log("Image uploaded: ", imageUrl);
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImage(file);
        if (file) {
            handleImageUpload();
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
                            <button type="button" className="user-change-image-bg" title="Change profile image" onClick={handleButtonClick}>
                                <BsCamera className="user-change-profile-img" />
                            </button>
                            <label htmlFor="file-input" className="visually-hidden">Upload Profile Picture</label>
                            <input
                                type="file"
                                id="file-input"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="input-file"
                            />
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