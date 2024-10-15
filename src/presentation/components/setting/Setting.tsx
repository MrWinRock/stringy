import "./Setting.css";
import { FaChevronRight } from "react-icons/fa";

const Setting: React.FC = () => {

  const handleEmailClick = () => {
    console.log("Email");
  };

  const handlePasswordClick = () => {
    console.log("Password");
  }

  const handleDeleteClick = () => {
    console.log("Delete");
  }
  
  return (
    <div className="setting">
      <h1>Setting</h1>
      <hr />
      <div className="setting-content">
        <div className="setting-general">
          <h2>General</h2>
          <div className="general-content">
            <div className="general-email">
              <button onClick={handleEmailClick}>
                <p>Email</p>
                <FaChevronRight className="setting-button-icon" />
              </button>
            </div>
            <div className="general-password">
              <button onClick={handlePasswordClick}>
                <p>Password</p>
                <FaChevronRight className="setting-button-icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="setting-advanced">
          <h2>Advanced</h2>
          <div className="advanced-content">
            <div className="advanced-delete">
              <button onClick={handleDeleteClick}>
                Delete Accout
                <FaChevronRight className="setting-button-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
