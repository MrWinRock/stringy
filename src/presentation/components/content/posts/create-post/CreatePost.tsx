import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./CreatePost.css";
import TextEditorToolbar from "./TextEditorToolbar";

const CreatePost: React.FC = () => {
    const [isTextButtonSelected, setIsTextButtonSelected] = useState<boolean>(true);
    const [isImageButtonSelected, setIsImageButtonSelected] = useState<boolean>(false);
    const [isCommunityButtonSelected, setIsCommunityButtonSelected] = useState<boolean>(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorRef = useRef<Editor | null>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    const handleOptionButtonClick = (btn: number) => {
        switch (btn) {
            case 1:
                setIsTextButtonSelected(true);
                setIsImageButtonSelected(false);
                setIsCommunityButtonSelected(false);
                break;
            case 2:
                setIsTextButtonSelected(false);
                setIsImageButtonSelected(true);
                setIsCommunityButtonSelected(false);
                break;
            case 3:
                setIsTextButtonSelected(false);
                setIsImageButtonSelected(false);
                setIsCommunityButtonSelected(true);
                break;
        }
    };

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        // Check if the command is a new line (enter key)
        if (command === "split-block") {
            resizeEditorContainer(); // Resize editor when a new line is added
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    // Resize editor container when a new line is created
    const resizeEditorContainer = () => {
        if (editorContainerRef.current) {
            const contentHeight = editorContainerRef.current.scrollHeight;
            editorContainerRef.current.style.height = `${contentHeight}px`;
        }
    };

    return (
        <div className="create-post">
            <div className="create-post-container">
                <div className="create-post-header">
                    <h1>Create Post</h1>
                    <p>Draft</p>
                </div>
                <div className="create-post-options">
                    <div className="create-post-text">
                        <button
                            type="button"
                            onClick={() => handleOptionButtonClick(1)}
                            className={`create-post-options-button ${isTextButtonSelected ? "isSelected" : ""}`}
                        >
                            <p>Text</p>
                        </button>
                    </div>
                    <div className="create-post-image">
                        <button
                            type="button"
                            onClick={() => handleOptionButtonClick(2)}
                            className={`create-post-options-button ${isImageButtonSelected ? "isSelected" : ""}`}
                        >
                            <p>Image</p>
                        </button>
                    </div>
                    <div className="create-post-community">
                        <button
                            type="button"
                            onClick={() => handleOptionButtonClick(3)}
                            className={`create-post-options-button ${isCommunityButtonSelected ? "isSelected" : ""}`}
                        >
                            <p>Community</p>
                        </button>
                    </div>
                </div>
                <div className="create-post-props">
                    <div className="create-post-title">
                        <input type="text" placeholder="Title" />
                    </div>
                    {isTextButtonSelected && (
                        <div className="editor">
                            <div
                                className="editor-container"
                                ref={editorContainerRef} // Editor container ref for resizing
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
                                    handleKeyCommand={handleKeyCommand} // Custom key command handler
                                    placeholder="Tell a story..."
                                />
                            </div>
                        </div>
                    )}
                    {isImageButtonSelected && (
                        <div className="add-image">
                            <h2>Image</h2>
                        </div>
                    )}
                    {isCommunityButtonSelected && (
                        <div className="community">
                            <h2>Community</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
