import React, { useEffect, useState } from "react";
import Post from "../content/posts/Post";
import Header from "../header/Header";
import Profile from "../profile/Profile";
import api from "./../../../services/api";
import { decodeToken } from "./../../../utils/authUtil";
import { Link } from "react-router-dom";

import './Pages.css';

interface PostData {
    id: string;
    room_title: string;
    username: string;
    post_title: string;
    content: string;
    room_picture_url?: string;
    post_image_url?: string;
}

const ProfilePage: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            setUserId(decodedToken.userId);
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            if (userId === null) return;

            try {
                const response = await api.get(`/posts/users/${userId}/posts`);

                let postsData = [];
                if (Array.isArray(response.data)) {
                    postsData = response.data;
                } else if (response.data && typeof response.data === 'object') {
                    postsData = [response.data];
                } else {
                    console.error("Unexpected API response format:", response.data);
                }

                const mappedPosts = postsData.map((post: any) => ({
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
        };

        fetchPosts();
    }, [userId]);

    return (
        <div className="content">
            <Header />
            <Profile />
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
                            post_image_url={post.post_image_url}
                        />
                    ))
                )}
            </section>
        </div>
    )
}

export default ProfilePage;