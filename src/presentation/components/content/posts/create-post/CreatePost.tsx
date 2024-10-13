import "draft-js/dist/Draft.css";
import "./CreatePost.css";
import TextEditorToolbar from "./TextEditorToolbar";
import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";

const CreatePost: React.FC = () => {
    const [isTextButtonSelected, setIsTextButtonSelected] = useState<boolean>(true);
    const [isImageButtonSelected, setIsImageButtonSelected] = useState<boolean>(false);
    const [isCommunityButtonSelected, setIsCommunityButtonSelected] = useState<boolean>(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorRef = useRef<Editor | null>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);

    // post components
    const [postTitle, setPostTitle] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");
    const [postImage, setPostImage] = useState<string>("");
    const [postCommunity, setPostCommunity] = useState<string>("");

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
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
        } else if (isCommunityButtonSelected) {
            setIsTextButtonSelected(true);
            setIsImageButtonSelected(false);
            setIsCommunityButtonSelected(false);
        }
    };

    const handleFileUpload = (file: File | null) => {
        if (file && file.type.startsWith("image/")) {
            setPostImage(file.name);
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

    return (
        <form className="create-post">
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
                        >
                            <p>Text</p>
                        </button>
                    </div>
                    <div className="create-post-image">
                        <button
                            type="button"
                            className={`create-post-options-button ${isImageButtonSelected ? "isSelected" : ""}`}
                        >
                            <p>Image</p>
                        </button>
                    </div>
                    <div className="create-post-community">
                        <button
                            type="button"
                            className={`create-post-options-button ${isCommunityButtonSelected ? "isSelected" : ""}`}
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
                            />
                            <div className="add-post-image">
                                {postImage && <p>{postImage}</p>}
                            </div>
                        </div>
                    )}
                    {isCommunityButtonSelected && (
                        <div className="community">
                            <input
                                type="text"
                                placeholder="Community"
                                value={postCommunity}
                                onChange={(e) => setPostCommunity(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="submit-container">
                        {isCommunityButtonSelected ? (
                            <button type="submit" className="">Post</button>
                        ) : (
                            <button type="button" onClick={handleNextClick} className="">Next</button>
                        )}
                    </div>
                </div>
            </div>
            <div className="post-test-button">
                <button type="button" onClick={() => {
                    setIsTextButtonSelected(true)
                    setIsImageButtonSelected(false)
                    setIsCommunityButtonSelected(false)
                }}>Text</button>
                <button type="button" onClick={() => {
                    setIsTextButtonSelected(false)
                    setIsImageButtonSelected(true)
                    setIsCommunityButtonSelected(false)
                }}>Image</button>
                <button type="button" onClick={() => {
                    setIsTextButtonSelected(false)
                    setIsImageButtonSelected(false)
                    setIsCommunityButtonSelected(true)
                }}>Comm</button>
            </div>
        </form>
    );
};

export default CreatePost;