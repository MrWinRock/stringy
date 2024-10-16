import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "./../../../../../services/api";

import stringy_logo from "./../../../../assets/images/logo_stringy.png";
import room_banner from "./../../../../assets/images/room_banner.png";

import Post from "../../posts/Post";
import './InRoom.css';

interface PostData {
    id: string;
    room_title: string;
    username: string;
    post_title: string;
    content: string;
    room_picture_url?: string;
    post_image_url?: string;
}

interface RoomData {
    room_id: string;
    title: string;
    room_picture_url?: string;
    room_banner_url?: string;
}

const InRoom: React.FC = () => {
    const { room_id } = useParams<{ room_id: string }>();
    const [posts, setPosts] = useState<PostData[]>([]);
    const [room, setRoom] = useState<RoomData | null>(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await api.get(`/rooms/${room_id}`);

                setRoom(response.data);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        fetchRoomData();
    }, [room_id]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (room && room.room_id) {
                try {
                    const response = await api.get(`/posts/rooms/${room.room_id}/posts`);

                    const mappedPosts = response.data.map((post: any) => ({
                        id: post.post_id,
                        room_title: post.room_title,
                        username: post.username,
                        post_title: post.post_title,
                        content: post.content,
                        room_picture_url: post.room_picture_url,
                        post_image_url: post.post_image_url,
                    }));
                    setPosts(mappedPosts);
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            } else {
                console.error("room_id is missing in the room data");
            }
        };

        if (room) {
            fetchPosts();
        }
    }, [room]);

    return (
        <div className="in-room">
            {room && (
                <div className="in-room-display">
                    {room.room_banner_url ? (
                        <img src={room.room_banner_url} alt="Room Banner" className="in-room-banner" />
                    ) : (
                        <img src={room_banner} alt="Room Banner" className="in-room-banner" />
                    )}
                    <div className="in-room-info">
                        {room.room_picture_url ? (
                            <img src={room.room_picture_url} alt="Room icon" className="in-room-icon" />
                        ) : (
                            <img src={stringy_logo} alt="Room icon" className="in-room-icon" />
                        )}
                        <h1>{room.title}</h1>
                    </div>
                </div>
            )}
            <section className="main-content">
                {posts.length === 0 ? (
                    <div className="no-post-found">
                        <p>No posts found</p>
                        <Link to="/create-post" className="page-create-post">Create a post...</Link>
                    </div>
                ) : (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            roomname={post.room_title}
                            username={post.username}
                            title={post.post_title}
                            content={post.content}
                            room_picture_url={post.room_picture_url}
                            post_image_url={post.post_image_url}
                        />
                    ))
                )}
            </section>
        </div>
    );
};

export default InRoom;