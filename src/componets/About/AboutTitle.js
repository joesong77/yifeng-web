import React from "react";
import "./AboutTitle.css";

const AboutTitle = ({title}) => {
  return (
    <div className="ab-intro-container">
      <div className="ab-intro-left">
        <h1>{title}</h1>
      </div>
      <div className="ab-intro-right">
        <div className="ab-intro-content">
          <p className="ab-intro-highlight">
            逸峰營造有限公司於民國2000年成立，以「專業、品質、服務、安全」為經營理念及最高的行動準則。
          </p>
          <p>
            經營目的在於「創造價值」即「創造顧客價值、創造員工價值、創造公司價值」，在經營理念方面，
            以「誠、信、勤、穩」做為未來發展的共同行為準則。
          </p>
        </div>
      </div>
    </div>
  );
}
export default AboutTitle;
