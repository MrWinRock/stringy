import stringy_logo from "../../assets/images/logo_stringy.png";
import "./Help.css";

const Help: React.FC = () => {
  return (
    <div className="help">
      <div className="help-container">
        <div className="help-header">
          <h2>Need help?</h2>
        </div>
        <div className="help-content">
          <div className="content-logo-text">
            <div className="help-logo">
              <img
                src={stringy_logo}
                alt="Stringy"
              />
            </div>
            <div className="text-location">
              <h2>String (Header office)</h2>
              <p>1 ถนน อู่ทองนอก แขวงดุสิต</p>
              <p> เขตดุสิต กรุงเทพมหานคร 10300</p>
            </div>
          </div>
          <div className="help-insert">
            <form className="help-insert-container">
              <div className="help-insert-name">
                <label htmlFor="insert-name">Full name</label>
                <input type="text" id="insert-name" />
              </div>
              <div className="help-insert-email">
                <label htmlFor="insert-email">Email</label>
                <input type="text" id="insert-email" />
              </div>
              <div className="help-insert-message">
                <label htmlFor="insert-message">Message</label>
                {/* <input type="text" id="insert-message" /> */}
                <textarea name="insert-message" id="insert-message" className="help-insert-textarea"></textarea>
              </div>
              <button type="submit" id="submit" className="help-send-button">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
