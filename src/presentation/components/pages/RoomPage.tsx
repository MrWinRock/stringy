import React from "react";
import Header from "../header/Header";
import Sidebar from "../content/sidebar/Sidebar";
import InRoom from "../content/rooms/in-room/InRoom";

import './Pages.css';

const RoomPage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <div className="main-content">
                <InRoom />
            </div>
        </div>
    );
};

export default RoomPage;