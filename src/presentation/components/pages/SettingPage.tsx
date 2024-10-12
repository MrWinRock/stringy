import Sidebar from "../content/sidebar/Sidebar";
import Header from "../header/Header";
import Setting from "../setting/Setting";

import './Pages.css'

const SettingPage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <Setting />
            </section>
        </div>
    );
}

export default SettingPage;
