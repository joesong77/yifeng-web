import React, { useState } from "react";
import "./ConstructionProjects.css";
// React 元件从這裡來
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';



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
    ,
    conservation: {
        title: "工程實積｜水保工程實績",
        projects: [
            {
                title: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程",
                images: [
                    { src: require("../../assets/construction/image 73.png"), alt: "千瑞營造淡水區竹圍擋土牆 1" },
                    { src: require("../../assets/construction/image 74.png"), alt: "千瑞營造淡水區竹圍擋土牆 2" },
                    { src: require("../../assets/construction/image 75.png"), alt: "千瑞營造淡水區竹圍擋土牆 3" },
                    { src: require("../../assets/construction/image 76.png"), alt: "千瑞營造淡水區竹圍擋土牆 4" },
                    { src: require("../../assets/construction/image 77.png"), alt: "千瑞營造淡水區竹圍擋土牆 5" },
                    { src: require("../../assets/construction/image 78.png"), alt: "千瑞營造淡水區竹圍擋土牆 6" },
                ]
            },
            {
                title: "疏濬工程(雙溪橡皮壩護坦及周邊護岸整建工程)",
                images: [
                    { src: require("../../assets/construction/image 79.png"), alt: "疏濬工程 1" },
                    { src: require("../../assets/construction/image 80.png"), alt: "疏濬工程 2" },
                    { src: require("../../assets/construction/image 81.png"), alt: "疏濬工程 3" },
                    { src: require("../../assets/construction/image 82.png"), alt: "疏濬工程 4" },

                ]

            }
        ]
    },
    prevention: {
        title: "工程實積｜防汛工程實績",
        projects: [
            {
                title: "",
                images: [
                    { src: require("../../assets/construction/image 92.png"), alt: " 1" },
                    { src: require("../../assets/construction/image 93.png"), alt: " 2" },
                    { src: require("../../assets/construction/image 94.png"), alt: " 3" },
                    { src: require("../../assets/construction/image 95.png"), alt: " 4" },
                    { src: require("../../assets/construction/image 96.png"), alt: " 5" },
                    { src: require("../../assets/construction/image 97.png"), alt: " 6" },
                ]
            },



        ]
    },
    teardown: {
        title: "工程實積｜拆除工程實績",
        projects: [
            {
                title: "富邦大樓-舊有地下室拆除工程",
                images: [
                    { src: require("../../assets/construction/image 98.png"), alt: "舊有地下室 1" },
                    { src: require("../../assets/construction/image 99.png"), alt: "舊有地下室 2" },
                    { src: require("../../assets/construction/image 100.png"), alt: "舊有地下室 3" },

                ]
            },
            {
                title: "房屋拆除工程案例(一)",
                title1: "",
                images: [
                    { src: require("../../assets/construction/image 101.png"), alt: "房屋拆除工程案例一" },
                    { src: require("../../assets/construction/image 102.png"), alt: "房屋拆除工程案例一" },
                    { src: require("../../assets/construction/image 103.png"), alt: "房屋拆除工程案例一" },
                ]
            },
            {
                title: "房屋拆除工程案例(二)",
                title1: "此為特殊拆除案件-歷史建築將外牆保留其於樑柱版拆除後重建• (現為陽明海洋博物館)",
                images: [
                    { src: require("../../assets/construction/image 104.png"), alt: "陽明海洋博物館 1" },
                    { src: require("../../assets/construction/image 105.png"), alt: "陽明海洋博物館 2" },
                    { src: require("../../assets/construction/image 106.png"), alt: "陽明海洋博物館 3" },


                ]

            },
            {
                title: "房屋拆除工程案例(三)",
                title1: "新北市永和區自由街拆除補強工程，此為連棟四層公寓，局部拆除並作保留戶結構補強工程",
                images: [
                    { src: require("../../assets/construction/image 107.png"), alt: "結構補強工程 1" },
                    { src: require("../../assets/construction/image 108.png"), alt: "結構補強工程 2" },
                    { src: require("../../assets/construction/image 109.png"), alt: "結構補強工程 3" },
                    { src: require("../../assets/construction/image 110.png"), alt: "結構補強工程 4" },



                ]

            }, {
                title: "房屋拆除工程案例(四)",
                title1: "",
                images: [
                    { src: require("../../assets/construction/image 111.png"), alt: "結構補強工程 5" },
                    { src: require("../../assets/construction/image 112.png"), alt: "結構補強工程 6" },
                    { src: require("../../assets/construction/image 113.png"), alt: "結構補強工程 7" },
                    { src: require("../../assets/construction/image 114.png"), alt: "結構補強工程 8" },


                ]

            },


        ]
    },
    landscape: {
        title: "工程實積｜景觀工程實績",
        projects: [
            {
                title: "第一美卡-廠內綠化景觀工程",
                images: [
                    { src: require("../../assets/construction/image 128.png"), alt: " 1" },
                    { src: require("../../assets/construction/image 129.png"), alt: " 2" },
                    { src: require("../../assets/construction/image 130.png"), alt: " 3" },
                    { src: require("../../assets/construction/image 131.png"), alt: " 4" },
                    { src: require("../../assets/construction/image 132.png"), alt: " 5" },
                    { src: require("../../assets/construction/image 133.png"), alt: " 6" },
                ]
            },



        ]
    }

};

const ConstructionProjects = () => {
    const [currentCategory, setCurrentCategory] = useState("building");



    const { title, projects } = allProjectCategories[currentCategory];

    return (
        <div className="projects-container">
            <div className="projects-tabs">
                <button onClick={() => setCurrentCategory("building")}>建築工程</button>
                <button onClick={() => setCurrentCategory("civil")}>土木工程</button>
                <button onClick={() => setCurrentCategory("conservation")}>水保工程</button>
                <button onClick={() => setCurrentCategory("prevention")}>防汛工程</button>
                <button onClick={() => setCurrentCategory("teardown")}>拆除工程</button>
                <button onClick={() => setCurrentCategory("landscape")}>景觀工程</button>
            </div>
            <h2 className="projects-title">{title}</h2>

            {projects.map((proj, i) => (
                <div key={i}>
                    <p className="subtitle">{proj.title}</p>
                    <p className="subtitle1">{proj.title1}</p>
                    <div className="image-grid">
                        {proj.images.length > 0 ? (

                            <Swiper
                                className="project-swiper"
                                spaceBetween={10}
                                navigation
                               
                                modules={[Navigation, Pagination]}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1440: { slidesPerView: 4 },
                                }}
                            >
                                {proj.images.map((img, j) => (
                                    <SwiperSlide key={j} className="project-slide">
                                        <img src={img.src} alt={img.alt} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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
