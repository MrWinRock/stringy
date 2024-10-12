import Header from "../header/Header";
import Profile from "../profile/Profile";

import './Pages.css'

const ProfilePage: React.FC = () => {
    return (
        <div className="content">
            <Header />
            <Profile />
            <section className="main-content">
            </section>
        </div>
    )
}

export default ProfilePage;
