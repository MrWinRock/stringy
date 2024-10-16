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
            &emsp;&emsp;เว็บไซต์นี้ถูกสร้างขึ้นเพื่อเป็นแหล่งรวมของคนที่สนใจในการเขียนโค้ด ไม่ว่าคุณจะเป็นมือใหม่ที่เพิ่งเริ่มต้น หรือเป็นมือโปรที่มีประสบการณ์ ที่นี่คุณสามารถเข้ามาพูดคุย แชร์ไอเดีย แลกเปลี่ยนความรู้ และช่วยกันแก้ปัญหาที่เกิดขึ้นในการเขียนโปรแกรมได้อย่างอิสระและยังมีตัวอย่างโค้ดและบทความที่จะช่วยให้คุณพัฒนาทักษะได้มากขึ้น เราอยากให้ที่นี่เป็นชุมชนที่สนุกและเป็นกันเองที่ทุกคนเรียนรู้ไปด้วยกัน
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
