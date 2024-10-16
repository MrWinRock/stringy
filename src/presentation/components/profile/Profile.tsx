import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import { getProfilePicture } from "../../../services/uploadService";
import { decodeToken } from "../../../utils/authUtil";
import { uploadService } from "./../../../services/uploadService";
import { getBio, updateBio } from "../../../services/profileService";

// icons import
import { FaRegUserCircle } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";

const Profile: React.FC = () => {
    const [username, setUsername] = useState<string>("Username");
    const [bio, setBio] = useState<string>("");
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newBio, setNewBio] = useState<string>("");

    const [image, setImage] = useState<File | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [canUpload, setCanUpload] = useState<boolean>(false);

    const token = localStorage.getItem("token");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (token) {
            const decodedToken = decodeToken(token);
            setUsername(decodedToken.username);
            setUserId(decodedToken.userId);
            fetchProfilePicture(decodedToken.userId);
            fetchBio(decodedToken.userId);
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

    const fetchBio = async (userId: number) => {
        try {
            const response = await getBio(userId);
            const fetchedBio = response.bio || "";
            setBio(fetchedBio);
            setNewBio(fetchedBio);
        } catch (error) {
            console.error("Error fetching bio:", error);
        }
    };

    const handleImageUpload = async () => {
        if (image && userId !== null) {
            try {
                const imageUrl = await uploadService(image, userId);
                setProfilePictureUrl(imageUrl);
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
            setCanUpload(false);
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
        setCanUpload(true);

        if (file) {
            handleImageUpload();
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        if (userId !== null) {
            try {
                await updateBio(userId, newBio);
                setBio(newBio);
                setEditMode(false);
            } catch (error) {
                console.error("Error updating bio:", error);
            }
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
                        {canUpload ? (
                            <button onClick={handleImageUpload} className="upload-image">Upload</button>
                        ) : (
                            null
                        )}
                        <div className="user-content">
                            <h2 className="profile-username">{username}</h2>
                            {/* <p className="profile-community">{communityJoined} Community joined.</p> */}

                            {editMode ? (
                                <div className="edit-profile">
                                    <textarea
                                        className="profile-bio-edit"
                                        value={newBio}
                                        placeholder="Write a bio..."
                                        onChange={(e) => setNewBio(e.target.value)}
                                    />
                                    <button className="profile-save-profile" onClick={handleSaveClick}>Save</button>
                                </div>
                            ) : (
                                <div className="edit-profile">
                                    <p className="profile-bio">
                                        {bio}
                                    </p>
                                    <button className="profile-edit-profile" onClick={handleEditClick}>Edit Profile</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;