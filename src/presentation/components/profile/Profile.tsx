import "./Profile.css";

// icons import
import { FaRegUserCircle } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";

const Profile: React.FC = () => {

    return (
        <div className="profile-page">
            <div className="profile-page-container">
                <div className="user-profile">
                    <div className="user-profile-container">
                        <div className="user-image">
                            <div className="user-image-container">
                                <FaRegUserCircle className="user-profile-img" />
                                <div className="user-change-image-bg">
                                    <BsCamera className="user-change-profile-img" />
                                </div>
                            </div>
                        </div>
                        {/* <h2>Username</h2>
                        <div className="community-profile">
                            <p>0 Community joined.</p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry.
                            </p>
                        </div>
                        <div className="socail-profile">
                            <p>Socail accounts</p>
                            <p>facebook.com</p>
                            <p>reddit.com</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
