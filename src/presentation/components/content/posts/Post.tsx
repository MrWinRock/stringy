import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";

import stringy_logo from "../../../assets/images/logo_stringy.png";

import "./Post.css";

interface PostProps {
    id: string;
    roomname: string;
    username: string;
    title: string;
    content: string;
    room_picture_url?: string;
    post_image_url?: string;
}

const Post: React.FC<PostProps> = ({ id, roomname, username, title, content, room_picture_url, post_image_url }) => {
    return (
        <section className="post">
            <Link to={`/${roomname}/${id}`} state={{ id, roomname, username, title, content, room_picture_url, post_image_url }}>
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
                        {post_image_url && (
                            <div className="post-image">
                                <img src={post_image_url} alt="Post" />
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </section>
    );
}

export default Post;