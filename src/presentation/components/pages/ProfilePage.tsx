import Header from "../header/Header";
import Profile from "../profile/Profile";

import './Pages.css'

const ProfilePage: React.FC = () => {
    return (
        <>
            <Header />
            <section className="content">
                <Profile />
            </section>
        </>
    )
}

export default ProfilePage;
