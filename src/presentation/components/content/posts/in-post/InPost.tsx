import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useNavigate } from "react-router-dom";
import api from "../../../../../services/api";

import stringy_logo from "../../../../assets/images/logo_stringy.png";
import { FaArrowLeft } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { decodeToken, DecodedToken } from "./../../../../../utils/authUtil";

import "./InPost.css";

interface InPostProps {
    postId: string;
    roomname: string;
    username: string;
    title: string;
    content: string;
    room_picture_url?: string;
    post_image_url?: string;
}

interface Comment {
    username: string;
    comment: string;
    profile_picture_url?: string;
}

const InPost: React.FC<InPostProps> = ({ postId, roomname, username, title, content, room_picture_url, post_image_url }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/posts/comment/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("Failed to load comments. Please try again later.");
            }
        };

        fetchComments();
    }, [postId]);

    const navigate = useNavigate();

    let htmlContent = "";

    if (content) {
        try {
            const rawContentState: RawDraftContentState = JSON.parse(content);
            const contentState = convertFromRaw(rawContentState);
            htmlContent = stateToHTML(contentState);
        } catch (e) {
            console.error("Error parsing content:", e);
        }
    } else {
        console.error("Content is undefined or invalid JSON");
    }

    const handleNavigatePrevious = () => {
        navigate(-1);
    };

    const handleCommentSend = async () => {
        if (!newComment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("User not authenticated");
            return;
        }

        const decodedToken: DecodedToken = decodeToken(token);

        try {
            await api.post("/posts/comment", {
                postId,
                userId: decodedToken.userId,
                comment: newComment,
            });
            setComments([...comments, { username: decodedToken.username, comment: newComment }]);
            setNewComment("");
            setError(null);
        } catch (error) {
            console.error("Error posting comment:", error);
            setError("No comment posted.");
        }
    };

    return (
        <section className="in-post">
            <div className="navigate-previous">
                <button onClick={handleNavigatePrevious} className="navigate-previous-button" aria-label="previous"><FaArrowLeft /></button>
            </div>
            <div className="in-post-container">
                <div className="in-post-header">
                    <div className="in-post-room">
                        {room_picture_url ? (
                            <img src={room_picture_url} alt="Room" />
                        ) : (
                            <img src={stringy_logo} alt="stringy logo" />
                        )}
                        <div className="in-post-name">
                            <p className="in-post-roomname">{roomname}</p>
                            <p className="in-post-username">{username}</p>
                        </div>
                    </div>
                    <div className="in-post-option">
                        <SlOptions className="in-post-icons" />
                    </div>
                </div>
                <div className="in-post-body">
                    <div className="in-post-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="in-post-content">
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    {post_image_url && (
                        <div className="in-post-image">
                            <img src={post_image_url} alt="Post" />
                        </div>
                    )}
                </div>
                <div className="in-post-devider"></div>
                <div className="in-post-comment-field">
                    <div className="in-post-comment">
                        <textarea
                            name="in-post-comment"
                            id="in-post-comment"
                            placeholder="Add Comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleCommentSend} aria-label="send"><BsSend /></button>
                    </div>

                    {comments.length > 0 && (
                        <div className="in-post-comments">
                            {comments.map((comment, index) => (
                                <div key={index} className="in-post-comments-field">
                                    {comment.profile_picture_url ? (
                                        <img src={comment.profile_picture_url} alt="User" />
                                    ) : (
                                        <img src={stringy_logo} alt="stringy logo" />
                                    )}
                                    {error ? (<p className="error-message">{error}</p>) : (
                                        <div className="in-post-comment-section">
                                            <p className="in-post-comment-username">{comment.username}</p>
                                            <p className="in-post-comment-comment">{comment.comment}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div >
        </section >
    );
}

export default InPost;