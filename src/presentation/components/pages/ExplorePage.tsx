import Explore from '../content/explore/Explore';
import Sidebar from '../content/sidebar/Sidebar';
import Header from '../header/Header';
import './Pages.css'

const ExplorePage = () => {
    return (
        <div className="content">
            <Header />
            <Sidebar />
            <div className="main-content">
                <Explore />
            </div>
        </div>
    )
}

export default ExplorePage;