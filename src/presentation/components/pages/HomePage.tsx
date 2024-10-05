import Sidebar from "../content/sidebar/Sidebar";
import Header from "../header/Header";

import './Pages.css'

const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <section className="content">
                <Sidebar />
            </section>
        </>
    );
};

export default HomePage;
