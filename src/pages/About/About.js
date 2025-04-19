import React, { useState } from "react";
import "./About.css";
import vennImage from "../../assets/venn-diagram.png";
import orgImage from "../../assets/org-structure.png";
import centuryImage from "../../assets/century.png";
import goalImage from "../../assets/goal-image.png";


import AboutTItle from "../../componets/About/AboutTitle"

const About = () => {
    const [view, setView] = useState('default');

    const handleToggle = (mode) => {
        setView(mode);
    };

    return (
        <div>
            <div className="aboutus-buttons">
                <button onClick={() => handleToggle('default')}>關於逸峰</button>
                <button onClick={() => handleToggle('org')}>企業組織架構</button>
                <button onClick={() => handleToggle('century')}>大世紀</button>
                <button onClick={() => handleToggle('eng')}>工程技術</button>
                <button onClick={() => handleToggle('fgp')}>未來展望</button>
            </div>

            {view === 'default' && (
                <>
                    <div className="aboutus-container2">
                        <AboutTItle title="關於逸峰" />

                        <div className="aboutus-text">
                            <p>．專業－定期員工教育訓練，增加員工基本職能，提高整體專業能力。</p>
                            <p>．服務－納入服務概念為導向，強化員工積極服務態度，達到以顧客為導向。</p>
                            <p>．品質－確保施工技術與速度，追求施工品質的穩定性。</p>
                            <p>．安全－加強施工人員安全觀念與規範，達到標準工地管理。</p>
                            <p>．永續經營－以永續經營理念出發，在公司內部進行管理整合與技術革新。</p>
                        </div>

                        <div className="aboutus-bottom">
                            <div className="venn-image2">
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
                </>
            )}

            {view === 'org' && (
                <>
                    <div className="aboutus-container2">
                        <AboutTItle title="企業組織架構" />

                       
                            <div className="venn-image2">
                                <img src={orgImage} alt="企業組織架構圖" />
                            </div>


                        
                    </div>
                    <div className="org-note">
                        <p className="note-title">■ 注意：品質管理、提升「經營績效」，保障「施工安全」逐步落實ISO 9000品質要求。實施：</p>
                        <ul className="note-list">
                            <li>採購簽發控制：財務安全控管機智、估驗請款執行、工程進度驗收控制、專業估價制。</li>
                            <li>勞工安全制度：資料管理、預算控管、維修繕後、品質稽核。</li>
                        </ul>

                        <p className="note-title">■ 完整工務系統管理專業架構 / 工務計劃流程</p>
                        <p className="note-flow">
                            估價→價單分析→工法確認→資材(財)管理→工程進度案查→估驗請款→結案
                        </p>
                    </div>
                </>
            )}
            {view === 'century' && (
                <>
                    <div className="aboutus-container2">
                        <AboutTItle title="大世紀" />
                        <div className="venn-image2">
                            <img src={centuryImage} alt="大世紀專案圖" />
                        </div>
                    </div>
                </>
            )}
            {view === 'eng' && (
                <>
                    <div className="eng-container">
                        <AboutTItle title="工程技術" />

                        <div className="eng-section">
                            <p className="eng-section-title">經營類別：</p>
                            <ul>
                                <li>土木工程：涵蓋各類基礎建設、結構設計與施工，並涉及道路、橋梁、隧道等項目規劃與實施。</li>
                                <li>基礎工程：專注於建築物或基礎設施的地基處理、深基坑開挖及支撐系統的設計與施工。</li>
                                <li>土方整地工程：進行大範圍土地整治、土方挖運、地形調整及排水系統的設計與建設。</li>
                                <li>管線工程掘開與埋設：包括各類地下管線的開挖、設置及回填，涵蓋水、電、氣等基礎設施管線的施工。</li>
                                <li>綠地環境規劃建設：提供城市或園區的綠化規劃、設計、施工及後續維護，提升環境質量與生態效益。</li>
                            </ul>
                        </div>

                        <div className="eng-section">
                            <p className="eng-section-title">專業工法：</p>
                            <ul>
                                <li>逆打工程：運用於地下結構施工中的先進技術，適用於狹小空間或複雜地質環境中的隧道開挖與支護。</li>
                                <li>深開挖基礎：針對深基坑開挖及支撐系統，採用先進的土壤穩定技術，確保施工過程中的安全性與結構穩定。</li>
                                <li>水利工程：涵蓋水源開發、河道治理、灌溉系統、排水設施等水利基礎設施的規劃與建設。</li>
                                <li>古蹟修復：專業技術修復歷史建築或文創資產，運用傳統工法與現代技術相結合，保護與修復珍貴的古蹟資產，維護其歷史與文化價值。</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
            {view === 'fgp' && (
                <>
                    <AboutTItle title="未來展望" />
                    <div className="aboutus-container2">


                        <div className="section">
                            <p className="subtitle">• 持續重視專業技術精進與品質維護</p>
                            <ul>
                                <li>取得各項專業技術證照</li>
                                <li>強化員工專業技術能力與安全維護觀念的提昇</li>
                                <li>加強管理施工品質與施工流程合理規範</li>
                            </ul>

                            <p className="subtitle">• 工程服務範圍擴展，多角化經營達成永續發展之目標</p>
                            <p className="indent">
                                除一般基本公共工程外，逐步提高民間建築工程、一般性土木工程、室內裝修工程...等之案件比例，
                                以分散經營風險，並求增加承接各種工程之經驗與能力
                            </p>
                        </div>
                        <div className="venn-image2">
                            <img src={goalImage} alt="未來展望圖" />
                        </div>


                    </div>
                </>
            )}


        </div>
    );
};

export default About;
