import { SlOptions } from "react-icons/sl";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import stringy_logo from "../../../../assets/images/logo_stringy.png";

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

    let htmlContent = content;

    try {
        const rawContentState: RawDraftContentState = JSON.parse(content);
        const contentState = convertFromRaw(rawContentState);
        htmlContent = stateToHTML(contentState);
    } catch (e) {
        console.error("Error parsing content:", e);
    }

    return (
        <section className="post">
            <div className="post-container">
                <div className="post-header">
                    <div className="post-room">
                        {room_picture_url ? (
                            <img src={room_picture_url} alt="Room" />
                        ) : (
                            <img src={stringy_logo} alt="stringy logo" />
                        )}
                        <div className="post-name">
                            <p className="post-roomname">{roomname}</p>
                            <p className="post-username">{username}</p>
                        </div>
                    </div>
                    <div className="post-option">
                        <SlOptions className="post-icons" />
                    </div>
                </div>
                <div className="post-body">
                    <div className="post-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="post-content">
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    {post_image_url && (
                        <div className="post-image">
                            <img src={post_image_url} alt="Post" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default InPost;