import React, { useEffect, useState } from "react";
import "./ConstructionProjects.css";

const allProjectCategories = {
  building: {
    title: "工程實積｜建築工程實績",
    projects: [
      {
        title: "臺北市文山區老泉街慈音山莊休閒餐廳新建工程",
        images: [
            { src: require("../../assets/construction/image 50.png"), alt: "慈音山莊 1" },
          { src: require("../../assets/construction/image 51.png"), alt: "慈音山莊 2" }
        ]
      },
      {
        title: "迴龍新建工程案(結構體部分)",
        images: [
            { src: require("../../assets/construction/image 52.png"), alt: "迴龍新建 1" },
            { src: require("../../assets/construction/image 53.png"), alt: "迴龍新建 2" }
        ]
      },
      {
        title: "建案排樁工程",
        images: [
            { src: require("../../assets/construction/image 54.png"), alt: "排椿工程 1" },
            { src: require("../../assets/construction/image 55.png"), alt: "排椿工程 2" }
        ]
      }
    ]
  },
  civil: {
    title: "工程實積｜土木工程實績",
    projects: [
      {
        title: "101年文山區萬芳路災害72小時搶通完成",
        images: [
            { src: require("../../assets/construction/image 56.png"), alt: "萬芳路災害 1" },
            { src: require("../../assets/construction/image 62.png"), alt: "萬芳路災害 2" },
            { src: require("../../assets/construction/image 57.png"), alt: "萬芳路災害 3" }
        ]
      },
      {
        title: "排水溝及道路修繕工程",
        images: [
            { src: require("../../assets/construction/image 58.png"), alt: "排水溝及道路修繕工程 1" },
            { src: require("../../assets/construction/image 59.png"), alt: "排水溝及道路修繕工程 2" }
        ]
      },
      {
        title: "雨水地下水道人孔更新工程",
        images: [
            { src: require("../../assets/construction/image 60.png"), alt: "雨水地下水道人孔更新工程 1" },
            { src: require("../../assets/construction/image 61.png"), alt: "雨水地下水道人孔更新工程 2" }
        ]
      },
      {
        title: "桃捷綠線土方工程 總數量20萬米最大深度34米(土 級配 岩盤混合)",
        images: [
            { src: require("../../assets/construction/image 63.png"), alt: "桃捷綠線土方工程 1" },
            { src: require("../../assets/construction/image 64.png"), alt: "桃捷綠線土方工程 2" }
        ]
      },
      {
        title: "台北吳興街土方工程 岩盤抗壓強度12000磅 總數1.2萬米",
        images: [
            { src: require("../../assets/construction/image 65.png"), alt: "台北吳興街土方工程 1" },
            { src: require("../../assets/construction/image 66.png"), alt: "台北吳興街土方工程 2" }
        ]
      },
      {
        title: "文山區光輝路土方工程  黏土及岩盤總數量10000米",
        images: [
            { src: require("../../assets/construction/image 67.png"), alt: "文山區光輝路土方工程 1" },
            { src: require("../../assets/construction/image 68.png"), alt: "文山區光輝路土方工程 2" }
        ]
      },
      {
        title: "蘇迪勒颱風緊急清淤 總數量40000米",
        images: [
            { src: require("../../assets/construction/image 69.png"), alt: "蘇迪勒颱風緊急清淤 1" },
            { src: require("../../assets/construction/image 70.png"), alt: "蘇迪勒颱風緊急清淤 2" },
            { src: require("../../assets/construction/image 71.png"), alt: "蘇迪勒颱風緊急清淤 3" },
            { src: require("../../assets/construction/image 72.png"), alt: "蘇迪勒颱風緊急清淤 4" }
        ]
      }
    ]
  }
};

const ConstructionProjects = () => {
  const [currentCategory, setCurrentCategory] = useState("building");

  useEffect(() => {
    document.title = allProjectCategories[currentCategory].title;
  }, [currentCategory]);

  const { title, projects } = allProjectCategories[currentCategory];

  return (
    <div className="projects-container">
      <div className="projects-tabs">
        <button onClick={() => setCurrentCategory("building")}>建築工程</button>
        <button onClick={() => setCurrentCategory("civil")}>土木工程</button>
      </div>
      <h2 className="projects-title">{title}</h2>
      {projects.map((proj, i) => (
        <div key={i}>
          <p className="subtitle">{proj.title}</p>
          <div className="image-grid">
            {proj.images.length > 0 ? (
              proj.images.map((img, j) => (
                <img key={j} src={img.src} alt={img.alt} />
              ))
            ) : (
              <p className="no-images">尚無圖片</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConstructionProjects;
