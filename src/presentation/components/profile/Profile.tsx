import "./Profile.css";

import { useState } from "react";

// icons import
import { FaRegUserCircle } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";

const Profile: React.FC = () => {

    const [username, setUsername] = useState<string>("Username");
    const [communityJoined, setCommunityJoined] = useState<number>(0);
    const [bio, setBio] = useState<string>(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel lectus posuere, aliquet augue in, convallis arcu."
    );
    const [socials, setSocials] = useState<string[]>(["facebook.com", "reddit.com"]);


    return (
        <div className="profile-page">
            <div className="profile-page-container">
                <div className="user-profile">
                    <div className="user-profile-container">
                        <div className="user-image">
                            <FaRegUserCircle className="user-profile-img" />
                            <button type="button" className="user-change-image-bg" title="Change profile image">
                                <BsCamera className="user-change-profile-img" />
                            </button>
                        </div>
                        <div className="user-content">
                            <h2 className="profile-username">{username}</h2>
                            <p className="profile-community">{communityJoined} Community joined.</p>
                            <p className="profile-bio">
                                {bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
