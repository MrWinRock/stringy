import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import Post from "../content/posts/Post";

import './Pages.css'

const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <section className="content">
                <Sidebar />
                <Post />
            </section>
        </>
    );
};

export default HomePage;
