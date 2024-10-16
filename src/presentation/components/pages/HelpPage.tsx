import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import Help from "../help/Help";

import './Pages.css'

const HomePage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <Help />
            </section>
        </div>
    );
};

export default HomePage;
