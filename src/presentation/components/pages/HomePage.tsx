import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import Post from "../content/posts/Post";

import './Pages.css'

const HomePage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <div className="main-content">
                <Post />
            </div>
        </div>
    );
};

export default HomePage;