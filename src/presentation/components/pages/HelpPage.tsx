import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import Help from "../help/Help";

import './Pages.css'

const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <section className="content">
                <Sidebar />
                <Help />
            </section>
        </>
    );
};

export default HomePage;
