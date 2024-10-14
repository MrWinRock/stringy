import { SlOptions } from "react-icons/sl";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useNavigate } from "react-router-dom";

import stringy_logo from "../../../../assets/images/logo_stringy.png";

import { FaArrowLeft } from "react-icons/fa";

import "./InPost.css";

interface InPostProps {
    roomname: string;
    username: string;
    title: string;
    content: string;
    room_picture_url?: string;
    post_image_url?: string;
}

const InPost: React.FC<InPostProps> = ({ roomname, username, title, content, room_picture_url, post_image_url }) => {
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

    return (
        <section className="in-post">
            <button onClick={handleNavigatePrevious} className="navigate-previous" aria-label="previous"><FaArrowLeft /></button>
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
            </div>
        </section>
    );
}

export default InPost;