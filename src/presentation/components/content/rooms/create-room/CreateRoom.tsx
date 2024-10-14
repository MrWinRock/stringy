import React, { useState } from "react";
import api from "./../../../../../services/api";
import { useNavigate } from "react-router-dom";

import { CiImageOn } from "react-icons/ci";

import "./CreateRoom.css";

const CreateRoom: React.FC = () => {
    const [isAboutButtonSelected, setIsAboutButtonSelected] = useState<boolean>(true);
    const [isStyleButtonSelected, setIsStyleButtonSelected] = useState<boolean>(false);

    const [roomTitle, setRoomTitle] = useState<string>("");
    const [roomContent, setRoomContent] = useState<string>("");
    const [banner, setBanner] = useState<File | null>(null);
    const [icon, setIcon] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleFileUpload = (file: File | null, type: "banner" | "icon") => {
        if (file && file.type.startsWith("image/")) {
            type === "banner" ? setBanner(file) : setIcon(file);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: "banner" | "icon") => {
        const files = event.target.files;
        if (files && files.length === 1) {
            handleFileUpload(files[0], type);
        } else {
            alert("Please upload only one image file.");
        }
    };

    const handleNextClick = () => {
        setIsAboutButtonSelected(false);
        setIsStyleButtonSelected(true);
    };

    const handleBackClick = () => {
        setIsAboutButtonSelected(true);
        setIsStyleButtonSelected(false);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (roomTitle === "" || roomContent === "") {
            alert("Please fill out all fields.");
            return;
        }

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("roomTitle", roomTitle);
        formData.append("description", roomContent);
        if (banner) formData.append("roomBanner", banner);
        if (icon) formData.append("roomImage", icon);

        try {
            const response = await api.post("/rooms/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log("Room created successfully:", response.data);
            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };


    return (
        <form className="create-room" onSubmit={handleSubmit}>
            <div className="create-room-container">
                <div className="create-room-header">
                    <h1>Create Room</h1>
                </div>
                <div className="create-room-options">
                    <div className="create-room-about">
                        <button
                            type="button"
                            className={`create-room-options-button ${isAboutButtonSelected ? "isSelected" : ""}`}
                            onClick={() => {
                                setIsAboutButtonSelected(true);
                                setIsStyleButtonSelected(false);
                            }}
                        >
                            <p>About Your Community</p>
                        </button>
                    </div>
                    <div className="create-room-style">
                        <button
                            type="button"
                            className={`create-room-options-button ${isStyleButtonSelected ? "isSelected" : ""}`}
                            onClick={() => {
                                setIsAboutButtonSelected(false);
                                setIsStyleButtonSelected(true);
                            }}
                        >
                            <p>Style</p>
                        </button>
                    </div>
                </div>
                <div className="create-room-fields">
                    {isAboutButtonSelected && (
                        <>
                            <div className="create-room-title">
                                <input
                                    type="text"
                                    placeholder="Community Name"
                                    value={roomTitle}
                                    onChange={(e) => setRoomTitle(e.target.value)}
                                />
                            </div>
                            <div className="create-room-content">
                                <textarea
                                    placeholder="Description"
                                    value={roomContent}
                                    onChange={(e) => setRoomContent(e.target.value)}
                                    className="create-room-textarea"
                                />
                            </div>
                        </>
                    )}
                    {isStyleButtonSelected && (
                        <div className="create-room-image">
                            <div className="create-room-banner">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileInputChange(e, "banner")}
                                    accept="image/*"
                                    id="bannerInput"
                                    className="file-input"
                                />
                                <div className="file-preview">
                                    {banner ? <p>Banner: {banner.name}</p> : <p>Banner</p>}
                                </div>
                                <label htmlFor="bannerInput" className="room-file-upload">
                                    <CiImageOn />Add
                                </label>
                            </div>
                            <div className="create-room-icon">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileInputChange(e, "icon")}
                                    accept="image/*"
                                    id="iconInput"
                                    className="file-input"
                                />
                                <div className="file-preview">
                                    {icon ? <p>Icon: {icon.name}</p> : <p>Icon</p>}
                                </div>
                                <label htmlFor="iconInput" className="room-file-upload">
                                    <CiImageOn />Add
                                </label>
                            </div>
                        </div>
                    )}
                    <div className="submit-container">
                        {isStyleButtonSelected ? (
                            <button type="submit" className="submit-room">Post</button>
                        ) : (
                            <div className="nav-room">
                                <div onClick={handleBackClick} className="back-room">Back</div>
                                <div onClick={handleNextClick} className="next-room">Next</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreateRoom;