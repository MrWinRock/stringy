import "draft-js/dist/Draft.css";
import TextEditorToolbar from "./TextEditorToolbar";
import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import api from "./../../../../../services/api";
import { decodeToken } from "./../../../../../utils/authUtil";
import { useNavigate } from "react-router-dom";

import logo_stringy from "./../../../../assets/images/logo_stringy.png";

import "./CreatePost.css";

interface Room {
    room_id: number;
    title: string;
    room_picture_url: string;
}

const CreatePost: React.FC = () => {
    const [isTextButtonSelected, setIsTextButtonSelected] = useState<boolean>(true);
    const [isImageButtonSelected, setIsImageButtonSelected] = useState<boolean>(false);
    const [isCommunityButtonSelected, setIsCommunityButtonSelected] = useState<boolean>(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorRef = useRef<Editor | null>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

    // post components
    const [postTitle, setPostTitle] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");
    const [postImage, setPostImage] = useState<File | null>(null);
    const [postCommunity, setPostCommunity] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get("/rooms/sidebar");
                setRooms(response.data.rooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
        const contentState = state.getCurrentContent();
        const rawContent = JSON.stringify(convertToRaw(contentState));
        setPostContent(rawContent);
    };

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        if (command === "split-block") {
            resizeEditorContainer();
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const handleNextClick = () => {
        if (isTextButtonSelected) {
            setIsTextButtonSelected(false);
            setIsImageButtonSelected(true);
            setIsCommunityButtonSelected(false);
        } else if (isImageButtonSelected) {
            setIsTextButtonSelected(false);
            setIsImageButtonSelected(false);
            setIsCommunityButtonSelected(true);
        }
    };

    const handleFileUpload = (file: File | null) => {
        if (file && file.type.startsWith("image/")) {
            setPostImage(file);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files && files.length === 1) {
            handleFileUpload(files[0]);
        } else {
            alert("Please upload only one image file.");
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length === 1) {
            handleFileUpload(files[0]);
        } else {
            alert("Please upload only one image file.");
        }
    };

    const resizeEditorContainer = () => {
        if (editorContainerRef.current) {
            const contentHeight = editorContainerRef.current.scrollHeight;
            editorContainerRef.current.style.height = `${contentHeight}px`;
        }
    };

    const handleRoomSelected = (room_id: number) => {
        const selectedRoom = rooms.find(room => room.room_id === room_id);
        if (selectedRoom) {
            setSelectedRoom(room_id);
            setPostCommunity(selectedRoom.room_id.toString());
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        let userId = null;
        if (token) {
            const decodedToken = decodeToken(token);
            userId = decodedToken.userId;
        }

        const formData = new FormData();
        formData.append("title", postTitle);
        formData.append("content", postContent);
        formData.append("roomId", postCommunity);
        if (postImage) {
            formData.append("postImage", postImage);
        }
        if (userId) {
            formData.append("userId", userId.toString());
        }

        try {
            const response = await api.post("/posts/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log("Post created successfully:", response.data);
            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form className="create-post" onSubmit={handleSubmit}>
            <div className="create-post-container">
                <div className="create-post-header">
                    <h1>Create Post</h1>
                    <p>Draft</p>
                </div>
                <div className="create-post-options">
                    <div className="create-post-text">
                        <button
                            type="button"
                            className={`create-post-options-button ${isTextButtonSelected ? "isSelected" : ""}`}
                            onClick={() => {
                                setIsTextButtonSelected(true);
                                setIsImageButtonSelected(false);
                                setIsCommunityButtonSelected(false);
                            }}
                        >
                            <p>Text</p>
                        </button>
                    </div>
                    <div className="create-post-image">
                        <button
                            type="button"
                            className={`create-post-options-button ${isImageButtonSelected ? "isSelected" : ""}`}
                            onClick={() => {
                                setIsTextButtonSelected(false);
                                setIsImageButtonSelected(true);
                                setIsCommunityButtonSelected(false);
                            }}
                        >
                            <p>Image</p>
                        </button>
                    </div>
                    <div className="create-post-community">
                        <button
                            type="button"
                            className={`create-post-options-button ${isCommunityButtonSelected ? "isSelected" : ""}`}
                            onClick={() => {
                                setIsTextButtonSelected(false);
                                setIsImageButtonSelected(false);
                                setIsCommunityButtonSelected(true);
                            }}
                        >
                            <p>Community</p>
                        </button>
                    </div>
                </div>
                <div className="create-post-props">
                    {isTextButtonSelected && (
                        <>
                            <div className="create-post-title">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                />
                            </div>
                            <div className="editor">
                                <div
                                    className="editor-container"
                                    ref={editorContainerRef}
                                >
                                    <TextEditorToolbar
                                        editorState={editorState}
                                        onChange={handleEditorChange}
                                    />
                                    <div className="editor-devider" />
                                    <Editor
                                        ref={editorRef}
                                        editorState={editorState}
                                        onChange={handleEditorChange}
                                        handleKeyCommand={handleKeyCommand}
                                        placeholder="Tell a story..."
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {isImageButtonSelected && (
                        <div
                            className="add-image"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <input
                                type="file"
                                onChange={handleFileInputChange}
                                accept="image/*"
                                placeholder="upload image"
                                id="fileInput"
                                className="file-input"
                            />
                            <label htmlFor="fileInput" className="file-upload">
                                Add Image
                            </label>
                            <div className="add-post-image">
                                {postImage ? <p>{postImage.name}</p> : <p>Drag & Drop</p>}
                            </div>
                        </div>
                    )}
                    {isCommunityButtonSelected && (
                        <div className="community">
                            {rooms.map((room) => (
                                <div key={room.room_id} className="room-list">
                                    <div className="room-field">
                                        <div className="create-post-room-list">
                                            {room.room_picture_url ? (
                                                <img src={room.room_picture_url} className="create-post-room-image" alt="room" />
                                            ) : (
                                                <img src={logo_stringy} className="create-post-room-image" alt="room" />
                                            )}
                                            <p>{room.title}</p>
                                        </div>
                                    </div>
                                    <div className="create-post-select-room">
                                        <button
                                            type="button"
                                            className={selectedRoom === room.room_id ? "selectedRoom" : ""}
                                            onClick={() => handleRoomSelected(room.room_id)}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="submit-container">
                        {isCommunityButtonSelected ? (
                            <button type="submit" className="next-post">Post</button>
                        ) : (
                            <div onClick={handleNextClick} className="next-post">Next</div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreatePost;