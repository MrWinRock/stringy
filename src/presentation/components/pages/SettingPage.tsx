import Sidebar from "../content/sidebar/Sidebar";
import Header from "../header/Header";
import Setting from "../setting/Setting";

import './Pages.css'

const SettingPage: React.FC = () => {
    return (
        <>
            <Header />
            <section className="content">
                <Sidebar />
                <Setting />
            </section>
        </>
    );
}

export default SettingPage;
