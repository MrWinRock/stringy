import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import CreateRoom from "../content/rooms/create-room/CreateRoom";

import './Pages.css'

const CreateRoomPage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <section className="main-content">
                <CreateRoom />
            </section>
        </div>
    );
};

export default CreateRoomPage;
