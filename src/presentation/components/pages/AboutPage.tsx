import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import About from "../about/About";

const AboutPage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <About />
            </section>
        </div>
    );
}

export default AboutPage;