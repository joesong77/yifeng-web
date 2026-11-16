import React, { useState, useEffect } from "react";
import "./ConstructionProjects.css";
// React 元件从這裡來
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';



import { legacyCatalog, fetchProjects, useRemoteProjects } from "./projectApi";

const ConstructionProjects = () => {
    const [currentCategory, setCurrentCategory] = useState("building");

    const [catalog, setCatalog] = useState(() => useRemoteProjects ? null : legacyCatalog);
    const [failed, setFailed] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!useRemoteProjects) return undefined;
        const controller = new AbortController();
        const timer = setTimeout(() => {
            controller.abort();
            setFailed(true);
        }, 10000);
        fetchProjects(controller.signal).then((result) => {
            if (!controller.signal.aborted) setCatalog(result);
        }).catch(() => {
            if (!controller.signal.aborted) setFailed(true);
        }).finally(() => clearTimeout(timer));
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [attempt]);

    const title = legacyCatalog[currentCategory].title;
    const projects = catalog?.[currentCategory].projects;
    return (
        <div className="projects-container">
            <div className="projects-tabs">

                <button onClick={() => setCurrentCategory("building")}>建築工程</button>
                <button onClick={() => setCurrentCategory("civil")}>土方工程</button>
                <button onClick={() => setCurrentCategory("infrastructure")}>土木工程</button>

                <button onClick={() => setCurrentCategory("water")}>水利工程</button>
                <button onClick={() => setCurrentCategory("conservation")}>水保工程</button>
                <button onClick={() => setCurrentCategory("teardown")}>拆除工程</button>
                <button onClick={() => setCurrentCategory("landscape")}>景觀工程</button>
                <button onClick={() => setCurrentCategory("volunteer")}>志工服務</button>
            </div>
            <h2 className="projects-title">{title}</h2>
            {failed && <p className="projects-loading" role="alert">
                目前無法載入工程實績。 <button type="button" onClick={() => { setFailed(false); setAttempt((n) => n + 1); }}>重試</button>
            </p>}
            {!catalog && !failed && <p className="projects-loading" role="status">資料載入中...</p>}
            {projects?.length === 0 && <p className="no-images">此分類目前沒有公開案場</p>}
            {projects?.map((proj) => (
                    <div key={proj.id}>
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
                                            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
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
