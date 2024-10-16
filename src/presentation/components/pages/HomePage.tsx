import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import Post from "../content/posts/Post";
import api from "./../../../services/api";
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

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts/posts');
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
        };

        fetchPosts();
    }, []);

    return (
        <div className="content">
            <Header />
            <Sidebar />
            <div className="main-content">
                {posts.map((post) => (
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
                ))}
            </div>
        </div>
    );
};

export default HomePage;