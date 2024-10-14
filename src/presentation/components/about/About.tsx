import React from "react";

import logo_stringy from "./../../assets/images/logo_stringy.png";
import "./About.css";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Aom",
      image: <img src={logo_stringy} className="team-image" alt="team" />,
    },
    {
      name: "Jay",
      image: <img src={logo_stringy} className="team-image" alt="team" />,
    },
    {
      name: "Win",
      image: <img src={logo_stringy} className="team-image" alt="team" />,
    },
    {
      name: "Dew",
      image: <img src={logo_stringy} className="team-image" alt="team" />,
    },
  ];

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h2>About Us</h2>
        </div>
        <div className="about-website">
          <p>
            &emsp;Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Omnis corporis eaque, ratione vitae animi eveniet optio aperiam
            natus laboriosam inventore. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Labore minus quis non accusantium rem dolores sed
            repellendus in veniam dolorum suscipit itaque maxime asperiores,
            dolor corporis doloremque, eligendi odit. Ipsum, porro voluptatum
            fuga pariatur dicta eius? Minima aspernatur nemo accusantium amet
            cum quidem ducimus quis incidunt eaque laborum impedit odit nihil
            optio suscipit expedita earum voluptatem mollitia dicta reiciendis
            ab, ut fugiat! Nemo quia unde saepe tenetur cupiditate! Ut harum
            aliquam delectus placeat autem facilis? Doloribus placeat blanditiis
            quas nulla inventore praesentium id. Voluptatem doloribus aperiam,
            ut beatae ad harum illum, distinctio quod sed eveniet praesentium
            quis, minus corporis nulla?
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
            beatae quia blanditiis ipsum. Quibusdam nemo repudiandae fugiat ea
            reiciendis velit!
          </p>
        </div>
        <div className="team-members">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-member">
              {member.image}
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
