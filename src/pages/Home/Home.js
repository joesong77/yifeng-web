import React from "react";
import { Link } from 'react-router-dom';

import "./Home.css";
import vennImage from "../../assets/venn-diagram.png"
import emginerImage from "../../assets/engineering-image.png"
import newsImage from "../../assets/news-Image.png"
// React 元件从這裡來
import { Swiper, SwiperSlide } from 'swiper/react';

// 功能模組從 swiper/modules 引入
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// 引入 CSS（必要）
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperImage from '../../assets/image 36.png'

// 引入 動畫套件
import { motion } from "framer-motion";
const images = Array.from({ length: 6 }, (_, i) =>
    require(`../../assets/machine/machine${i + 1}.png`)
);

const Home = () => {
    return (
        <div>
            <div className="swiper-container">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.custom-swiper-button-prev',
                        nextEl: '.custom-swiper-button-next'
                    }}
                    pagination={{
                        type: 'fraction',
                        el: '.custom-swiper-pagination',
                    }}

                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    className="swiper"
                >
                    <SwiperSlide style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <img src={SwiperImage} alt="" width="50%" height="50%" />
                    </SwiperSlide>
                    <SwiperSlide style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <img src={SwiperImage} alt="" width="50%" height="50%" />
                    </SwiperSlide>
                    {/* 自訂的箭頭按鈕，位置完全由 CSS 決定 */}

                    <div className="custom-nav custom-swiper-button-prev">←</div>
                    <div className="custom-nav custom-swiper-button-next">→</div>
                    {/* 分頁數字容器 */}
                    {/* <div className="custom-swiper-pagination"></div> */}
                </Swiper>


            </div>
            <div className="aboutus-section">

                <div className="aboutus-container">
                    <div className="venn-image">
                        <motion.img
                            src={vennImage}
                            alt="永續經營Venn圖"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                        />
                    </div>


                    <div className="aboutus-text">
                        <div className="title">關於逸峰</div>
                        <p>
                            逸峰營造有限公司於民國89年9月設立，資本額為五佰萬元，創立初期以承攬國家公共工程及一般性民間工程為主，
                            這些年來已累積了豐富的工程施工經驗，對施工專業技術之提昇及工程品質嚴格控管均為公司經營目標。
                        </p>
                        <p>
                            「積極主動、安全自覺」是逸峰營造的特質，隨著各企業指導不斷的成長；
                            確立逸峰營造的充滿熱誠與氣度的企業使命─以「專業、品質、服務、安全」滿足業主的需求。
                        </p>
                        <p>
                            逸峰營造的經營目的在於「創造價值」即「創造顧客價值、創造員工價值、創造公司價值」，
                            在經營理念方面，以「誠、信、勤、穩」做為逸峰營造未來發展的共同行為準則。
                        </p>
                        <Link to="/about">
                            <button className="read-more"  >READ MORE →</button>
                        </Link>
                    </div>


                </div>
            </div>

            <div className="container">
                <div className="text-section">
                    <h1 className="title">工程實績</h1>
                    <p>
                        逸峰營造有限公司於民國89年9月成立，資本額為五佰萬元，創立初期以承攬國家公共工程及一般性民間工程為主，這些年來已累積了豐富的工程施工經驗，對施工專業技術及工程品質嚴格控管皆為公司經營目標。
                        「積極主動、安全至善」是逸峰營造的特質，隨著各企業指導不斷的成長，確立迴峰營造的充滿宏觀與氣度的企業使命—以「專業、品質、服務、安全」滿足業主的需求。
                    </p>
                    <p>
                        逸峰營造的經營目的在於「創造價值」即「創造顧客價值、創造員工價值、創造公司價值」，在經營理念方面，以「誠、信、勤、穩」做為迴峰營造未來發展的共同行為準則。
                    </p>
                    <Link to="/construction">
                        <button className="read-more">READ MORE →</button>
                    </Link>
                </div>
                <div className="image-section">
                    <img
                        src={emginerImage}
                        alt="Engineering Project"
                    />
                </div>
            </div>
            <div className="machine-container">
                <div className="text-section">
                    <h1 className="title">機具租賃</h1>
                    <p>
                        提供多種大型機具租賃服務，適用於各類工程等各類專業領域。不論是短期專案還是長期工程，我們的機具租賃方案都能滿足您的需求，讓企業與個人無需投入高昂成本購置設備，即可靈活調度所需機具，提高作業效率。
                    </p>
                    <p>
                        透過專業的租賃服務，您可以根據不同工地作業環境選擇最適合的設備，確保施工品質與安全。我們也提供機具維護與技術支援，讓您無後顧之憂，專注於工程進度與業務發展。
                    </p>
                    <Link to="/excavator">
                        <button className="read-more">READ MORE →</button>
                    </Link>
                </div>
                <div className="image-section grid-section">
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`machine-${index + 1}`} className="machine-image" />
                    ))}
                </div>
            </div>
            <div className="news-container">
                <div className="text-section">
                    <h1 className="title">最新消息</h1>
                    <ul className="news-list">
                        <li>•2022獲選臺北市政府公共工程卓越獎。</li>
                        <li>•2022獲選臺北市政府卓越匠師獎。</li>
                    </ul>
                    <button className="read-more">READ MORE →</button>
                </div>
                <div className="image-section">
                    <img src={newsImage} alt="news" className="news-image" />
                </div>
            </div>
        </div>
    );

}


export default Home