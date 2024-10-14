import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import InPost from "./../content/posts/in-post/InPost";

import './Pages.css';

const InPostPage: React.FC = () => {
    const location = useLocation();
    const post = location.state;

    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <InPost {...post} />
            </section>
        </div>
    );
};

export default InPostPage;