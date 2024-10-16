import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import InPost from "./../content/posts/in-post/InPost";
import api from "../../../services/api";

import './Pages.css';

const InPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/posts/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Failed to load post. Please try again later.");
            }
        };

        if (postId) {
            fetchPost();
        } else {
            setError("Invalid post ID");
        }
    }, [postId]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <InPost {...post} postId={postId} />
            </section>
        </div>
    );
};

export default InPostPage;