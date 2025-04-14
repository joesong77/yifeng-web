import React from "react";
import "./About.css";
import vennImage from "../../assets/venn-diagram.png"

const About = () => {
    return (

        <div className="aboutus-container2">
              <h2 className="aboutus-title">關於逸峰</h2>
            {/* 上方：說明文字 */}
            <div className="aboutus-text">
                <p>．專業－定期員工教育訓練，增加員工基本職能，提高整體專業能力。</p>
                <p>．服務－納入服務概念為導向，強化員工積極服務態度，達到以顧客為導向。</p>
                <p>．品質－確保施工技術與速度，追求施工品質的穩定性。</p>
                <p>．安全－加強施工人員安全觀念與規範，達到標準工地管理。</p>
                <p>．永續經營－以永續經營理念出發，在公司內部進行管理整合與技術革新。</p>
            </div>

            {/* 下方：圖片 + 條列 並排 */}
            <div className="aboutus-bottom">
                <div className="venn-image">
                    <img src={vennImage} alt="永續經營圖示" />
                </div>
                <div className="aboutus-list">
                    <ul>
                        <li>高效率的營運團隊</li>
                        <li>建全的管理制度</li>
                        <li>管理資訊化</li>
                        <li>不斷的創新施工技術</li>
                        <li>最好的施工管理</li>
                        <li>妥善的工作規劃</li>
                        <li>完整的財務規劃</li>
                        <li>永續經營的企業堅持</li>
                        <li>最新的營建機具與設備</li>
                    </ul>
                </div>
            </div>
        </div>


    );

}


export default About