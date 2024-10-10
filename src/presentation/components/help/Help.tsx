import "./Help.css";
import s_logo from "../../assets/images/s_logo.png";

const Help: React.FC = () => {
  return (
    <div className="help">
      <div className="help-container">
        <div className="help-header">
          <div className="help-title">
            <p>Need help?</p>
          </div>
        </div>
        <div className="help-content">
          <div className="logo">
            <img src={s_logo} alt="Stringy" />
          </div>
          <div className="text-location">
            <p>String (Header office)</p>
            <p>1 ถนน อู่ทองนอก แขวงดุสิต เขตดุสิต กรุงเทพมหานคร 10300</p>
          </div>
          <div className="help-insert">
            <form className="help-insert-massage">
              <div className="help-insert-username">
                <label htmlFor="insert-username">Username</label>
                <input
                  type="text" id="insert-username" placeholder="Username" />
              </div>
              <div className="help-insert-email">
                <label htmlFor="insert-email">Email</label>
                <input type="text" id="insert-email" placeholder="Email" />
              </div>
              <div className="help-insert-message">
                <label htmlFor="insert-message">Message</label>
                <input type="text" id="insert-message" placeholder="Message" />
              </div>
              <button className="help-send-button"> send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
