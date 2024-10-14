import "./Setting.css";
import { FaChevronRight } from "react-icons/fa";

const Setting: React.FC = () => {
  return (
    <div className="setting">
      <strong>
        <h1>Setting</h1>
      </strong>
      <hr style={{ border: "1px solid black", margin: "20px 0" }} />

      <div className="setting-content">
        <div className="settting-general">
          <strong>
            <h2>General</h2>
          </strong>
          <div className="general-content">
            <div className="general-email">
              <p>Email</p>
              <button>
                <FaChevronRight />
              </button>
            </div>
            <div className="general-password">
              <p>Password</p>
              <button>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="settting-advanced">
          <strong>
            <h2>Advanced</h2>
          </strong>
          <div className="advanced-content">
            <div className="advanced-delete">
              Delete Accout
              <button>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
