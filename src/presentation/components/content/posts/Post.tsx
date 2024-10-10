import { useEffect, useState } from "react";
import api from './../../../../services/api';
import { decodeToken } from "../../../../utils/authUtil";

// import icons
import { SlOptions } from "react-icons/sl";

const Post: React.FC = () => {
    const [roomname, setRoomname] = useState<string>('Roomname');
    const [username, setUsername] = useState<string>('Username');
    const [title, setTitle] = useState<string>('Title');
    const [content, setContent] = useState<string>('Content');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            setUsername(decodedToken.username);
        }
    }, []);

    useEffect(() => {
        const fetchRoomname = async () => {
            try {
                const response = await api.get('/room');
                setRoomname(response.data.roomname);
            } catch (error) {
                console.error("Error fetching room name:", error);
            }
        };

        fetchRoomname();
    }, []);

    return (
        <section className="post">
            <div className="post-container">
                <div className="post-header">
                    <div className="post-room">
                        <div className="post-roomname">
                            <p>{roomname}</p>
                        </div>
                        <div className="post-username">
                            <p>{username}</p>
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
                    <div className="post-image">
                        <img src="/" alt="roomimg" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Post;