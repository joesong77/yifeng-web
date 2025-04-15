import React, { useState } from "react";
import "./Excavator.css";


import img1 from '../../assets/excavator/image1.png';
import img2 from "../../assets/excavator/image2.png";
import img3 from "../../assets/excavator/image3.png";
import img4 from "../../assets/excavator/image4.png";
import img5 from "../../assets/excavator/image5.png";
import img6 from "../../assets/excavator/image6.png";
import img7 from '../../assets/excavator/image7.png';
import img8 from "../../assets/excavator/image8.png";
import img9 from "../../assets/excavator/image9.png";
import img10 from "../../assets/excavator/image10.png";
import img11 from "../../assets/excavator/image11.png";
import img12 from "../../assets/excavator/image12.png";
import img13 from '../../assets/excavator/image13.png';
import img14 from "../../assets/excavator/image14.png";
import img15 from "../../assets/excavator/image15.png";
import img16 from "../../assets/excavator/image16.png";
import img17 from "../../assets/excavator/image17.png";
import img18 from "../../assets/excavator/image18.png";

const excavatorData = {
    large: [
        { src: img1, label: "500型怪手(含31米伸縮臂)" },
        { src: img2, label: "450型怪手(含22米伸縮臂)" },
        { src: img3, label: "370型怪手" },
        { src: img4, label: "300型怪手" },
        { src: img5, label: "200型怪手" },
        { src: img6, label: "200型怪手(短手頓皮勺)" },
    ],
    small: [
        { src: img7, label: "130型怪手(短手頓皮勺)" },
        { src: img8, label: "110型怪手(短手頓皮勺)" },
        { src: img9, label: "55型怪手(含破碎機)" },
        { src: img10, label: "40型怪手(含破碎機)" },
        { src: img11, label: "40型怪手(含破碎機)" },
        { src: img12, label: "17型怪手(含破碎機)" },


    ],
    other: [
        { src: img13, label: "470裝載機" },
        { src: img14, label: "13噸壓路機" },
        { src: img15, label: "小山貓" },
        { src: img16, label: "推土機" },
        { src: img17, label: "小壓路機" },
        { src: img18, label: "鏟裝機" },


    ]
};

const Excavator = () => {
    const [tab, setTab] = useState("large");
    return (
        <div className="excavator-container">
                  <div className="excavator-tabs">
                <button
                    className={tab === "large" ? "active" : ""}
                    onClick={() => setTab("large")}
                >
                    大型怪手
                </button>
                <button
                    className={tab === "small" ? "active" : ""}
                    onClick={() => setTab("small")}
                >
                    小型怪手
                </button>
                <button
                    className={tab === "other" ? "active" : ""}
                    onClick={() => setTab("other")}
                >
                    其他器具
                </button>
            </div>
            <h2 className="excavator-title">機具租賃｜     {tab === "large" ? "大型怪手" : tab === "small" ? "小型怪手" : "其他器具"}</h2>
      
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
}

export default Excavator;