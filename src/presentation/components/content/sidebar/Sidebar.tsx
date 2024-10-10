import { useState } from "react";

import "./Sidebar.css";

import logo_stringy from "./../../../assets/images/logo_stringy.png";

// import icons
import { PiFireBold } from "react-icons/pi"; // popular
import { TbWorld } from "react-icons/tb"; // explore
import { CgBookmark } from "react-icons/cg"; // saved
import { LuPlusSquare } from "react-icons/lu"; // create
import { TbHelpCircle } from "react-icons/tb"; // help
import { FaChevronDown } from "react-icons/fa"; // dropdown

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [dropdownCommunities, setDropdownCommunities] = useState(true);
  const [dropdownResources, setDropdownResources] = useState(true);

  const handleCommunitiesClick = () => {
    setDropdownCommunities(!dropdownCommunities);
  };

  const handleResourcesClick = () => {
    setDropdownResources(!dropdownResources);
  };

  return (
    <section className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-section">
          <ul className="sidebar-nav">
            <li>
              <button className="sidebar-button">
                <PiFireBold className="sidebar-icon " />
                <p>Popular</p>
              </button>
            </li>
            <li>
              <button className="sidebar-button">
                <TbWorld className="sidebar-icon " />
                <p>Explore</p>
              </button>
            </li>
            <li>
              <button className="sidebar-button">
                <CgBookmark className="sidebar-icon " />
                <p>Saved</p>
              </button>
            </li>
          </ul>
        </div>
        <div className="sidebar-section">
          <button
            onClick={handleCommunitiesClick}
            className={`communities-dropdown ${
              dropdownCommunities ? "show-community" : ""
            }`}
          >
            <p>Communities</p>
            <FaChevronDown
              className={`dropdown-icon ${
                dropdownCommunities ? "show-dropdown" : ""
              }`}
            />
          </button>
          <div
            className={`dropdown-content ${dropdownCommunities ? "show" : ""}`}
          >
            <button className="sidebar-create-community sidebar-button">
              <LuPlusSquare className="sidebar-icon" />
              <p>Create a Community</p>
            </button>
            <ul className="sidebar-nav">
              <li>
                <button className="sidebar-button">
                  <p>Room</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-section">
          <button
            onClick={handleResourcesClick}
            className={`resources-dropdown ${
              dropdownResources ? "show-resource" : ""
            }`}
          >
            <p>Resources</p>
            <FaChevronDown
              className={`dropdown-icon ${
                dropdownResources ? "show-dropdown" : ""
              }`}
            />
          </button>
          <div
            className={`dropdown-content ${dropdownResources ? "show" : ""}`}
          >
            <ul className="sidebar-nav">
              <li>
                <Link to="/about" className="sidebar-button">
                  <img
                    src={logo_stringy}
                    className="sidebar-image"
                    alt="logo"
                  />
                  <p>Stringy</p>
                </Link>
              </li>
              <li>
                <button className="sidebar-button">
                  <TbHelpCircle className="sidebar-icon" />
                  <p>Help</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
