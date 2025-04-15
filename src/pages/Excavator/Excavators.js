import React, { useState } from "react";
import "./Excavator.css";
import images from "../../assets/excavator/image";

const excavatorData = {
  large: [
    { src: images.img1, label: "500型怪手(含31米伸縮臂)" },
    { src: images.img2, label: "450型怪手(含22米伸縮臂)" },
    { src: images.img3, label: "370型怪手" },
    { src: images.img4, label: "300型怪手(含短手及破碎機)" },
    { src: images.img5, label: "200型怪手" },
    { src: images.img6, label: "200型怪手(含短手頑皮豹、破碎機、鋼牙、蝴蝶剪)" },
  ],
  small: [
    { src: images.img7, label: "130型怪手(短手頑皮豹)" },
    { src: images.img8, label: "110型怪手(短手頑皮豹)" },
    { src: images.img9, label: "55型怪手(含破碎機)" },
    { src: images.img10, label: "40型怪手(含破碎機)" },
    { src: images.img11, label: "40型怪手(含破碎機)" },
    { src: images.img12, label: "17型怪手(含破碎機)" },
  ],
  other: [
    { src: images.img13, label: "470裝載機" },
    { src: images.img14, label: "13噸壓路機" },
    { src: images.img15, label: "小山貓" },
    { src: images.img16, label: "推土機" },
    { src: images.img17, label: "小壓路機" },
    { src: images.img18, label: "鏟裝機" },
  ],
};

const Excavator = () => {
  const [tab, setTab] = useState("large");
  return (
    <div className="excavator-container">
      <div className="excavator-tabs">
        <button className={tab === "large" ? "active" : ""} onClick={() => setTab("large")}>
          大型怪手
        </button>
        <button className={tab === "small" ? "active" : ""} onClick={() => setTab("small")}>
          小型怪手
        </button>
        <button className={tab === "other" ? "active" : ""} onClick={() => setTab("other")}>
          其他器具
        </button>
      </div>
      <h2 className="excavator-title">
        機具租賃｜{tab === "large" ? "大型怪手" : tab === "small" ? "小型怪手" : "其他器具"}
      </h2>

      <div className="excavator-grid">
        {excavatorData[tab].map((item, index) => (
          <div className="excavator-card" key={index}>
            <img src={item.src} alt={item.label} loading="lazy" />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Excavator;
