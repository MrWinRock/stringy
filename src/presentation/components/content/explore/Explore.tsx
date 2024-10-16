import { useEffect, useState } from "react";
import api from "../../../../services/api";
import logo_stringy from "./../../../assets/images/logo_stringy.png";
import { Link } from "react-router-dom";

import "./Explore.css";

interface Room {
    room_id: string;
    title: string;
    room_picture_url: string;
}

const Explore: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get("/rooms/rooms");
                setRooms(response.data.rooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="explore">
            <div className="explore-container">
                {rooms.map((room) => (
                    <Link to={`/${room.room_id}`} key={room.room_id} className="explore-room-list">
                        <div className="explore-room-container">
                            {room.room_picture_url ? (
                                <img src={room.room_picture_url} className="explore-room-image" alt="room" />
                            ) : (
                                <img src={logo_stringy} className="explore-room-image" alt="room" />
                            )}
                            <p>{room.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Explore;