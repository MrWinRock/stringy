import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import About from "../about/About";

const AboutPage: React.FC = () => {
    return (
        <>
        <Header />
        <Sidebar />
        <section className="content">
            <About />
        </section>
        </>
    );
}

export default AboutPage;