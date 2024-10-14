import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import CreatePost from "../content/posts/create-post/CreatePost";

import './Pages.css'

const CreatePostPage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <CreatePost />
            </section>
        </div>
    );
};

export default CreatePostPage;
