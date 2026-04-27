import React, { useState, useEffect } from "react";
import "./ConstructionProjects.css";
// React 元件从這裡來
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';



const allProjectCategories = {
    building: {
        title: "工程實積｜建築工程實績",
        projects: [
            {
                title: "慈音山莊",
                images: [
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image1.jpg"), alt: "慈音山莊1" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image2.jpg"), alt: "慈音山莊2" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image3.jpg"), alt: "慈音山莊3" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image3-1.jpg"), alt: "慈音山莊3-1" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image4.jpg"), alt: "慈音山莊4" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image5.jpg"), alt: "慈音山莊5" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image6.jpg"), alt: "慈音山莊6" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image7.jpg"), alt: "慈音山莊7" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image7-1.jpg"), alt: "慈音山莊7-1" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image8.jpg"), alt: "慈音山莊8" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image9.jpg"), alt: "慈音山莊9" },
                    { src: require("../../assets/建築工程實績/1.慈音山莊/image10.jpg"), alt: "慈音山莊10" },
                ]
            },
            {
                title: "迴龍新建工程案(結構體部分)",
                images: [

                    { src: require("../../assets/建築工程實績/2.迴龍新建工程案(結構體部分)/image3.png"), alt: "迴龍新建工程案3" },
                    { src: require("../../assets/建築工程實績/2.迴龍新建工程案(結構體部分)/image4.png"), alt: "迴龍新建工程案3" },
                ]
            },
            {
                title: "建案排樁工程",
                images: [
                    { src: require("../../assets/建築工程實績/3.建案排樁工程/image1.png"), alt: "建案排樁工程1" },
                    { src: require("../../assets/建築工程實績/3.建案排樁工程/image2.jpg"), alt: "建案排樁工程2" },

                ]
            },

        ]
    },
    civil: {
        title: "工程實積｜土方工程實績",
        projects: [
            {
                title: "航空城路基回填31000米",
                images: [
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image1.png"), alt: "航空城路基回填1" },
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image2.png"), alt: "航空城路基回填2" },
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image3.jpg"), alt: "航空城路基回填3" },
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image4.jpg"), alt: "航空城路基回填4" },
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image5.jpg"), alt: "航空城路基回填5" },
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image6.png"), alt: "航空城路基回填6" },
                    { src: require("../../assets/土方工程實績/1.航空城路基回填31000米/image7.png"), alt: "航空城路基回填7" },

                ]
            },
            {
                title: "桃園GO3站開挖",
                images: [
                    { src: require("../../assets/土方工程實績/2.桃園GO3開挖/image1.png"), alt: "桃園GO3開挖1" },
                    { src: require("../../assets/土方工程實績/2.桃園GO3開挖/image2.png"), alt: "桃園GO3開挖2" },
                    { src: require("../../assets/土方工程實績/2.桃園GO3開挖/image3.png"), alt: "桃園GO3開挖3" },
                    { src: require("../../assets/土方工程實績/2.桃園GO3開挖/image4.png"), alt: "桃園GO3開挖3" },
                    { src: require("../../assets/土方工程實績/2.桃園GO3開挖/image5.png"), alt: "桃園GO3開挖5" },

                ]
            },
            {
                title: "木柵建案",
                images: [

                ]
            },
            {
                title: "桃園捷運結構物回填",
                images: [
                    { src: require("../../assets/土方工程實績/3.桃園捷運結構物回填/image1.png"), alt: "桃園捷運結構物回填 1" },
                    { src: require("../../assets/土方工程實績/3.桃園捷運結構物回填/image2.png"), alt: "桃園捷運結構物回填 2" },
                    { src: require("../../assets/土方工程實績/3.桃園捷運結構物回填/image3.png"), alt: "桃園捷運結構物回填 3" },

                ]
            },
            {
                title: "青園國小",
                images: [

                ]
            },
            {
                title: "文山區光輝路土方工程  黏土及岩盤總數量10000米",
                images: [
                    { src: require("../../assets/土方工程實績/4.文山區光輝路土方工程  黏土及岩盤總數量10000米/image1.png"), alt: "文山區光輝路土方工程 1" },
                    { src: require("../../assets/土方工程實績/4.文山區光輝路土方工程  黏土及岩盤總數量10000米/image2.png"), alt: "文山區光輝路土方工程 2" },
                    { src: require("../../assets/土方工程實績/4.文山區光輝路土方工程  黏土及岩盤總數量10000米/image3.jpg"), alt: "文山區光輝路土方工程 3" },
                    { src: require("../../assets/土方工程實績/4.文山區光輝路土方工程  黏土及岩盤總數量10000米/image4.png"), alt: "文山區光輝路土方工程 4" },

                ]
            },
            {
                title: "桃捷引道段開挖",
                images: [
                    { src: require("../../assets/土方工程實績/5.桃捷引道段開挖/image1.png"), alt: "桃捷引道段開挖 1" },
                    { src: require("../../assets/土方工程實績/5.桃捷引道段開挖/image2.png"), alt: "桃捷引道段開挖 2" },
                    { src: require("../../assets/土方工程實績/5.桃捷引道段開挖/image3.jpg"), alt: "桃捷引道段開挖 3" },
                    { src: require("../../assets/土方工程實績/5.桃捷引道段開挖/image4.jpg"), alt: "桃捷引道段開挖 4" },
                    { src: require("../../assets/土方工程實績/5.桃捷引道段開挖/image5.jpg"), alt: "桃捷引道段開挖 5" },

                ]
            },
            {
                title: "桃園捷運vs4土方",
                images: [
                    { src: require("../../assets/土方工程實績/6.桃園捷運vs4土方/image1.jpg"), alt: "桃園捷運vs4土方 1" },
                    { src: require("../../assets/土方工程實績/6.桃園捷運vs4土方/image2.jpg"), alt: "桃園捷運vs4土方 2" },
                    { src: require("../../assets/土方工程實績/6.桃園捷運vs4土方/image3.jpg"), alt: "桃園捷運vs4土方 3" },



                ]
            },

        ]
    },
    infrastructure: {
        title: "工程實積｜土木工程實績",
        projects: [
            {
                title: "世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)",
                images: [
                    { src: require("../../assets/土木工程實績/1.世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)/image1.JPG"), alt: "世大運迎風公園滑輪冰場工程1" },
                    { src: require("../../assets/土木工程實績/1.世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)/image2.JPG"), alt: "世大運迎風公園滑輪冰場工程2" },
                    { src: require("../../assets/土木工程實績/1.世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)/image3.JPG"), alt: "世大運迎風公園滑輪冰場工程3" },
                    { src: require("../../assets/土木工程實績/1.世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)/image4.JPG"), alt: "世大運迎風公園滑輪冰場工程4" },
                    { src: require("../../assets/土木工程實績/1.世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)/image5.jpg"), alt: "世大運迎風公園滑輪冰場工程5" },
                    { src: require("../../assets/土木工程實績/1.世大運迎風公園滑輪冰場工程該場地獲九面金牌並打破400公尺世界紀錄(原世界紀錄為室內場地)/image6.jpg"), alt: "世大運迎風公園滑輪冰場工程6" },
                ]
            },
            {
                title: "志偉建案水溝-空",
                images: [

                ]
            },
            {
                title: "木柵元利案AC鋪設",
                images: [
                    { src: require("../../assets/土木工程實績/3.木柵元利案AC鋪設/image1.png"), alt: "木柵元利案AC鋪設1" },
                    { src: require("../../assets/土木工程實績/3.木柵元利案AC鋪設/image2.jpg"), alt: "木柵元利案AC鋪設2" },
                    { src: require("../../assets/土木工程實績/3.木柵元利案AC鋪設/image3.jpg"), alt: "木柵元利案AC鋪設3" },
                    { src: require("../../assets/土木工程實績/3.木柵元利案AC鋪設/image4.png"), alt: "木柵元利案AC鋪設3" },
                ]
            },
            {
                title: "華固時代置地大樓AC鋪設",
                images: [
                    { src: require("../../assets/土木工程實績/4.華固時代置地大樓AC鋪設/image1.jpg"), alt: "華固時代置地大樓AC鋪設1" },
                    { src: require("../../assets/土木工程實績/4.華固時代置地大樓AC鋪設/image2.jpg"), alt: "華固時代置地大樓AC鋪設2" },
                    { src: require("../../assets/土木工程實績/4.華固時代置地大樓AC鋪設/image3.png"), alt: "華固時代置地大樓AC鋪設3" },
                    { src: require("../../assets/土木工程實績/4.華固時代置地大樓AC鋪設/image4.jpg"), alt: "華固時代置地大樓AC鋪設4" },
                ]
            },
            {
                title: "河濱公園AC銑鋪3",
                images: [
                    { src: require("../../assets/土木工程實績/5.河濱公園AC銑鋪3/image1.png"), alt: "河濱公園AC銑鋪31" },
                    { src: require("../../assets/土木工程實績/5.河濱公園AC銑鋪3/image2.png"), alt: "河濱公園AC銑鋪32" },
                    { src: require("../../assets/土木工程實績/5.河濱公園AC銑鋪3/image3.png"), alt: "河濱公園AC銑鋪33" },
                ]
            },
            {
                title: "自來水管",
                images: [

                ]
            },


        ]

    },
    water: {
        title: "工程實積｜水利工程實績",
        projects: [
            {
                title: "護坡緊急搶修",
                images: [
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image1.png"), alt: "護坡緊急搶修1" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image2.png"), alt: "護坡緊急搶修2" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image3.jpg"), alt: "護坡緊急搶修3" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image4.jpg"), alt: "護坡緊急搶修4" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image5.jpg"), alt: "護坡緊急搶修5" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image6.jpg"), alt: "護坡緊急搶修6" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image7.jpg"), alt: "護坡緊急搶修7" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image8.png"), alt: "護坡緊急搶修8" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image9.png"), alt: "護坡緊急搶修9" },
                    { src: require("../../assets/水利工程實績/1.護坡緊急搶修/image10.png"), alt: "護坡緊急搶修10" },


                ]
            },
            {
                title: "大稻埕疏濬工程",
                images: [
                    { src: require("../../assets/水利工程實績/2.大稻埕疏濬工程/image1.png"), alt: "大稻埕疏濬工程1" },
                    { src: require("../../assets/水利工程實績/2.大稻埕疏濬工程/image2.png"), alt: "大稻埕疏濬工程2" },
                    { src: require("../../assets/水利工程實績/2.大稻埕疏濬工程/image3.png"), alt: "大稻埕疏濬工程3" },



                ]
            },
            {
                title: "環河北路與鄭州路口箱涵緊急重建",
                images: [
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image1.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建1" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image2.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建2" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image3.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建3" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image4.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建4" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image5.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建5" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image6.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建6" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image7.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建7" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image8.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建8" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image9.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建9" },
                    { src: require("../../assets/水利工程實績/3.環河北路與鄭州路口箱涵緊急重建/image10.jpg"), alt: "環河北路與鄭州路口箱涵緊急重建10" },
                ]
            },
            {
                title: "大稻埕",
                images: [
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image1.jpg"), alt: "大稻埕1" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image2.jpg"), alt: "大稻埕2" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image3.jpg"), alt: "大稻埕3" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image4.jpg"), alt: "大稻埕4" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image5.jpg"), alt: "大稻埕5" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image6.jpg"), alt: "大稻埕6" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image7.jpg"), alt: "大稻埕7" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image8.jpg"), alt: "大稻埕8" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image9.jpg"), alt: "大稻埕9" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image10.jpg"), alt: "大稻埕10" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image11.jpg"), alt: "大稻埕11" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image12.jpg"), alt: "大稻埕12" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image13.jpg"), alt: "大稻埕13" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image14.jpg"), alt: "大稻埕14" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image15.jpg"), alt: "大稻埕15" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image16.jpg"), alt: "大稻埕16" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image17.jpg"), alt: "大稻埕17" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image18.jpg"), alt: "大稻埕18" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image19.jpg"), alt: "大稻埕19" },
                    { src: require("../../assets/水利工程實績/3-1大稻埕/image20.jpg"), alt: "大稻埕20" },
                ]
            },
            {
                title: "疏濬工程(雙溪橡皮壩護坦及周邊護岸整建工程)",
                images: [
                    { src: require("../../assets/水利工程實績//3-2疏濬工程(雙溪橡皮壩護坦及周邊護岸整建工程)/image1.png"), alt: "雙溪橡皮壩護坦及周邊護岸整建工程1" },
                    { src: require("../../assets/水利工程實績//3-2疏濬工程(雙溪橡皮壩護坦及周邊護岸整建工程)/image2.png"), alt: "雙溪橡皮壩護坦及周邊護岸整建工程2" },
                    { src: require("../../assets/水利工程實績//3-2疏濬工程(雙溪橡皮壩護坦及周邊護岸整建工程)/image3.png"), alt: "雙溪橡皮壩護坦及周邊護岸整建工程3" },
                    { src: require("../../assets/水利工程實績//3-2疏濬工程(雙溪橡皮壩護坦及周邊護岸整建工程)/image4.png"), alt: "雙溪橡皮壩護坦及周邊護岸整建工程4" },

                ]
            },
            {
                title: "涵洞出水口處於泥清除",
                images: [
                    { src: require("../../assets/水利工程實績/4.涵洞出水口處於泥清除/image1.png"), alt: "涵洞出水口處於泥清除1" },
                    { src: require("../../assets/水利工程實績/4.涵洞出水口處於泥清除/image2.png"), alt: "涵洞出水口處於泥清除2" },
                    { src: require("../../assets/水利工程實績/4.涵洞出水口處於泥清除/image3.png"), alt: "涵洞出水口處於泥清除3" },


                ]
            },
            {
                title: "河岸雜草樹木清除",
                images: [
                    { src: require("../../assets/水利工程實績/5.河岸雜草樹木清除/image1.png"), alt: "河岸雜草樹木清除1" },
                    { src: require("../../assets/水利工程實績/5.河岸雜草樹木清除/image2.png"), alt: "河岸雜草樹木清除2" },
                    { src: require("../../assets/水利工程實績/5.河岸雜草樹木清除/image3.png"), alt: "河岸雜草樹木清除3" },

                ]
            },
            {
                title: "逸仙國小操場",
                images: [
                    { src: require("../../assets/水利工程實績/6.逸仙國小操場/image1.png"), alt: "逸仙國小操場1" },
                    { src: require("../../assets/水利工程實績/6.逸仙國小操場/image2.png"), alt: "逸仙國小操場2" },
                    { src: require("../../assets/水利工程實績/6.逸仙國小操場/image3.png"), alt: "逸仙國小操場3" },
                ]
            },
            {
                title: "景美溪與指南溪匯流口泥清除",
                images: [
                    { src: require("../../assets/水利工程實績/7.景美溪與指南溪匯流口泥清除/image1.png"), alt: "景美溪與指南溪匯流口泥清除1" },
                    { src: require("../../assets/水利工程實績/7.景美溪與指南溪匯流口泥清除/image2.png"), alt: "景美溪與指南溪匯流口泥清除2" },
                    { src: require("../../assets/水利工程實績/7.景美溪與指南溪匯流口泥清除/image3.png"), alt: "景美溪與指南溪匯流口泥清除3" },
                ]
            },
            {
                title: "萬芳路災害72小時搶通完成",
                images: [
                    { src: require("../../assets/水利工程實績/萬芳路災害72小時搶通完成/image1.png"), alt: "萬芳路災害72小時搶通完成1" },
                    { src: require("../../assets/水利工程實績/萬芳路災害72小時搶通完成/image2.png"), alt: "萬芳路災害72小時搶通完成2" },
                    { src: require("../../assets/水利工程實績/萬芳路災害72小時搶通完成/image3.png"), alt: "萬芳路災害72小時搶通完成3" },
                ]
            },
            {
                title: "機車道規劃",
                images: [
                    { src: require("../../assets/水利工程實績/機車道規劃/image1.png"), alt: "機車道規劃1" },
                    { src: require("../../assets/水利工程實績/機車道規劃/image2.png"), alt: "機車道規劃2" },
                    { src: require("../../assets/水利工程實績/機車道規劃/image3.png"), alt: "機車道規劃3" },
                ]
            },



        ]
    }
    ,
    conservation: {
        title: "工程實積｜水保工程實績",
        projects: [
            {
                title: "南湖國小擋土牆拆除及新建",
                images: [
                    { src: require("../../assets/水保工程實績/1.南湖國小擋土牆拆除及新建/image1.png"), alt: "南湖國小擋土牆拆除及新建1" },
                    { src: require("../../assets/水保工程實績/1.南湖國小擋土牆拆除及新建/image2.png"), alt: "南湖國小擋土牆拆除及新建2" },
                    { src: require("../../assets/水保工程實績/1.南湖國小擋土牆拆除及新建/image3.png"), alt: "南湖國小擋土牆拆除及新建3" },
                    { src: require("../../assets/水保工程實績/1.南湖國小擋土牆拆除及新建/image4.png"), alt: "南湖國小擋土牆拆除及新建4" },
                ]

            },
               {
                title: "冷水坑-空",
                images: [
                  
                ]
            },
            {
                title: "建案施作擋土牆",
                images: [
                    { src: require("../../assets/水保工程實績/2.建案施作擋土牆/image1.png"), alt: "建案施作擋土牆1" },
                    { src: require("../../assets/水保工程實績/2.建案施作擋土牆/image2.png"), alt: "建案施作擋土牆2" },
                    { src: require("../../assets/水保工程實績/2.建案施作擋土牆/image3.png"), alt: "建案施作擋土牆3" },
                    { src: require("../../assets/水保工程實績/2.建案施作擋土牆/image4.png"), alt: "建案施作擋土牆4" },
                    { src: require("../../assets/水保工程實績/2.建案施作擋土牆/image5.png"), alt: "建案施作擋土牆5" },
                ]
            },
            {
                title: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程",
                images: [
                    { src: require("../../assets/水保工程實績/3.千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程/image1.png"), alt: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程1" },
                    { src: require("../../assets/水保工程實績/3.千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程/image2.png"), alt: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程2" },
                    { src: require("../../assets/水保工程實績/3.千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程/image3.png"), alt: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程3" },
                    { src: require("../../assets/水保工程實績/3.千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程/image4.png"), alt: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程4" },
                    { src: require("../../assets/水保工程實績/3.千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程/image5.png"), alt: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程5" },
                    { src: require("../../assets/水保工程實績/3.千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程/image6.png"), alt: "千瑞營造淡水區竹圍擋土牆、沉砂池等水保設施工程6" },
                ]
            },
            {
                title: "邊坡基礎排樁工程",
                images: [
                    { src: require("../../assets/水保工程實績/4.邊坡基礎排樁工程/image1.jpg"), alt: "邊坡基礎排樁工程1" },
                    { src: require("../../assets/水保工程實績/4.邊坡基礎排樁工程/image2.jpg"), alt: "邊坡基礎排樁工程2" },
                    { src: require("../../assets/水保工程實績/4.邊坡基礎排樁工程/image3.jpg"), alt: "邊坡基礎排樁工程3" },
                    { src: require("../../assets/水保工程實績/4.邊坡基礎排樁工程/image4.jpg"), alt: "邊坡基礎排樁工程4" },
                    { src: require("../../assets/水保工程實績/4.邊坡基礎排樁工程/image5.jpg"), alt: "邊坡基礎排樁工程5" },
                    { src: require("../../assets/水保工程實績/4.邊坡基礎排樁工程/image6.jpg"), alt: "邊坡基礎排樁工程6" },

                ]
            },
              {
    title: "楓林橋藝術石材拼畫、陶板",
    images: [
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image1.jpg"), alt: "楓林橋藝術石材拼畫、陶板1" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image2.jpg"), alt: "楓林橋藝術石材拼畫、陶板2" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image3.jpg"), alt: "楓林橋藝術石材拼畫、陶板3" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image4.jpg"), alt: "楓林橋藝術石材拼畫、陶板4" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image5.jpg"), alt: "楓林橋藝術石材拼畫、陶板5" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image6.jpg"), alt: "楓林橋藝術石材拼畫、陶板6" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image7.jpg"), alt: "楓林橋藝術石材拼畫、陶板7" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image8.jpg"), alt: "楓林橋藝術石材拼畫、陶板8" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image9.jpg"), alt: "楓林橋藝術石材拼畫、陶板9" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image10.jpg"), alt: "楓林橋藝術石材拼畫、陶板10" },
        { src: require("../../assets/水保工程實績/5.楓林橋藝術石材拼畫、陶板/image11.jpg"), alt: "楓林橋藝術石材拼畫、陶板11" },
    ]
},
{
    title: "竹子湖",
    images: [
      
        { src: require("../../assets/水保工程實績/6.竹子湖/image2.jpg"), alt: "竹子湖2" },
        { src: require("../../assets/水保工程實績/6.竹子湖/image3.jpg"), alt: "竹子湖3" },
        { src: require("../../assets/水保工程實績/6.竹子湖/image4.JPG"), alt: "竹子湖4" },
        { src: require("../../assets/水保工程實績/6.竹子湖/image5.JPG"), alt: "竹子湖5" },
        { src: require("../../assets/水保工程實績/6.竹子湖/image6.JPG"), alt: "竹子湖6" },
        { src: require("../../assets/水保工程實績/6.竹子湖/image7.JPG"), alt: "竹子湖7" },
        { src: require("../../assets/水保工程實績/6.竹子湖/image8.JPG"), alt: "竹子湖8" },
    ]
},
            
           
        ]
    },

    teardown: {
        title: "工程實積｜拆除工程實績",
        projects: [
            {
                title: "新莊國中",
                images: [
                    { src: require("../../assets/拆除工程實績/1.新莊國中-還缺照片/S__13860874_0.jpg"), alt: "新莊國中1" },
                    { src: require("../../assets/拆除工程實績/1.新莊國中-還缺照片/S__13860875_0.jpg"), alt: "新莊國中2" },
                    { src: require("../../assets/拆除工程實績/1.新莊國中-還缺照片/S__13860876_0.jpg"), alt: "新莊國中3" },
                ]
            },
            {
                title: "富邦大樓-逆打舊有地下室拆除工程",
                images: [
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image1.png"), alt: "富邦大樓地下室拆除工程1" },
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image2.png"), alt: "富邦大樓地下室拆除工程2" },
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image3.jpg"), alt: "富邦大樓地下室拆除工程3" },
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image4.jpg"), alt: "富邦大樓地下室拆除工程4" },
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image5.jpg"), alt: "富邦大樓地下室拆除工程5" },
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image6.jpg"), alt: "富邦大樓地下室拆除工程6" },
                    { src: require("../../assets/拆除工程實績/2.富邦大樓-逆打舊有地下室拆除工程/image7.png"), alt: "富邦大樓地下室拆除工程7" },
                ]
            },

            {
                title: "房屋拆除工程案例(一)",
                images: [
                    { src: require("../../assets/拆除工程實績/3.房屋拆除工程案例(一)/image1.png"), alt: "房屋拆除工程案例一1" },
                    { src: require("../../assets/拆除工程實績/3.房屋拆除工程案例(一)/image2.png"), alt: "房屋拆除工程案例一2" },
                    { src: require("../../assets/拆除工程實績/3.房屋拆除工程案例(一)/image3.png"), alt: "房屋拆除工程案例一3" },
                ]
            },
            {
                title: "華亭街拆除",
                images: [

                ]
            },
            {
                title: "蘆中人行陸橋",
                images: [
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image1.png"), alt: "蘆中人行陸橋1" },
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image2.png"), alt: "蘆中人行陸橋2" },
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image3.png"), alt: "蘆中人行陸橋3" },
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image4.png"), alt: "蘆中人行陸橋4" },
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image5.jpg"), alt: "蘆中人行陸橋5" },
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image6.png"), alt: "蘆中人行陸橋6" },
                    { src: require("../../assets/拆除工程實績/4.蘆中人行陸橋/image7.png"), alt: "蘆中人行陸橋7" },
                ]
            },
            {
                title: "房屋拆除工程案例(二) 此為特殊拆除案件-歷史建築將外牆保留其於樑柱版拆除後重建。(現為陽明海洋博物館)",
                images: [
                    { src: require("../../assets/拆除工程實績/5.房屋拆除工程案例(二) 此為特殊拆除案件-歷史建築將外牆保留其於樑柱版拆除後重建• (現為陽明海洋博物館)/image1.png"), alt: "房屋拆除工程案例二1" },
                    { src: require("../../assets/拆除工程實績/5.房屋拆除工程案例(二) 此為特殊拆除案件-歷史建築將外牆保留其於樑柱版拆除後重建• (現為陽明海洋博物館)/image2.png"), alt: "房屋拆除工程案例二1" },
                    { src: require("../../assets/拆除工程實績/5.房屋拆除工程案例(二) 此為特殊拆除案件-歷史建築將外牆保留其於樑柱版拆除後重建• (現為陽明海洋博物館)/image3.png"), alt: "房屋拆除工程案例二1" },
                ]
            },
            {
                title: "蘆洲貴子人行陸橋",
                images: [
                    { src: require("../../assets/拆除工程實績/6.蘆洲貴子人行陸橋/image1.png"), alt: "蘆洲貴子人行陸橋1" },
                    { src: require("../../assets/拆除工程實績/6.蘆洲貴子人行陸橋/image2.png"), alt: "蘆洲貴子人行陸橋2" },
                    { src: require("../../assets/拆除工程實績/6.蘆洲貴子人行陸橋/image3.png"), alt: "蘆洲貴子人行陸橋3" },
                    { src: require("../../assets/拆除工程實績/6.蘆洲貴子人行陸橋/image4.png"), alt: "蘆洲貴子人行陸橋4" },
                    { src: require("../../assets/拆除工程實績/6.蘆洲貴子人行陸橋/image5.png"), alt: "蘆洲貴子人行陸橋5" },
                ]
            },
            {
                title: "房屋拆除工程案例(三)-新北市永和區自由街拆除補強工程，此為連棟四層公寓，局部拆除並作保留戶結構補強工程",
                images: [
                    { src: require("../../assets/拆除工程實績/7.房屋拆除工程案例(三)-新北市永和區自由街拆除補強工程，此為連棟四層公寓，局部拆除並作保留戶結構補強工程/image1.png"), alt: "房屋拆除工程案例三1" },
                    { src: require("../../assets/拆除工程實績/7.房屋拆除工程案例(三)-新北市永和區自由街拆除補強工程，此為連棟四層公寓，局部拆除並作保留戶結構補強工程/image2.png"), alt: "房屋拆除工程案例三2" },
                    { src: require("../../assets/拆除工程實績/7.房屋拆除工程案例(三)-新北市永和區自由街拆除補強工程，此為連棟四層公寓，局部拆除並作保留戶結構補強工程/image3.png"), alt: "房屋拆除工程案例三3" },
                    { src: require("../../assets/拆除工程實績/7.房屋拆除工程案例(三)-新北市永和區自由街拆除補強工程，此為連棟四層公寓，局部拆除並作保留戶結構補強工程/image4.png"), alt: "房屋拆除工程案例三4" },
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
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image1.png"), alt: "第一美卡-廠內綠化景觀工程1" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image2.png"), alt: "第一美卡-廠內綠化景觀工程2" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image3.png"), alt: "第一美卡-廠內綠化景觀工程3" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image4.png"), alt: "第一美卡-廠內綠化景觀工程4" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image5.jpg"), alt: "第一美卡-廠內綠化景觀工程5" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image6.jpg"), alt: "第一美卡-廠內綠化景觀工程6" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image1.png"), alt: "第一美卡-廠內綠化景觀工程7" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image7.jpg"), alt: "第一美卡-廠內綠化景觀工程8" },
                    { src: require("../../assets/景觀工程實績/1.第一美卡-廠內綠化景觀工程/image8.jpg"), alt: "第一美卡-廠內綠化景觀工程9" },
                ]
            },
            {
                title: "和巧工廠",
                images: [
                    { src: require("../../assets/景觀工程實績/2.和巧工廠/image1.png"), alt: "和巧工廠1" },
                    { src: require("../../assets/景觀工程實績/2.和巧工廠/image2.png"), alt: "和巧工廠2" },
                    { src: require("../../assets/景觀工程實績/2.和巧工廠/image3.png"), alt: "和巧工廠3" },
                    { src: require("../../assets/景觀工程實績/2.和巧工廠/image4.png"), alt: "和巧工廠4" },
                ]
            },
            {
                title: "華固時代置地",
                images: [
                    { src: require("../../assets/景觀工程實績/3.華固時代置地/image1.png"), alt: "華固時代置地1" },
                    { src: require("../../assets/景觀工程實績/3.華固時代置地/image2.png"), alt: "華固時代置地2" },
                    { src: require("../../assets/景觀工程實績/3.華固時代置地/image3.png"), alt: "華固時代置地3" },
                    { src: require("../../assets/景觀工程實績/3.華固時代置地/image4.png"), alt: "華固時代置地4" },
                    { src: require("../../assets/景觀工程實績/3.華固時代置地/image5.png"), alt: "華固時代置地5" },
                ]
            },
            {
                title: "橫山書法藝術館步道",
                images: [
                    { src: require("../../assets/景觀工程實績/4.橫山書法藝術館步道/image1.png"), alt: "橫山書法藝術館步道1" },
                    { src: require("../../assets/景觀工程實績/4.橫山書法藝術館步道/image2.png"), alt: "橫山書法藝術館步道2" },
                    { src: require("../../assets/景觀工程實績/4.橫山書法藝術館步道/image3.png"), alt: "橫山書法藝術館步道3" },
                    { src: require("../../assets/景觀工程實績/4.橫山書法藝術館步道/image4.png"), alt: "橫山書法藝術館步道4" },
                ]
            },
            {
                title: "堤壁修復及彩繪",
                images: [
                    { src: require("../../assets/景觀工程實績/5.堤壁修復及彩繪/image1.png"), alt: "堤壁修復及彩繪1" },
                    { src: require("../../assets/景觀工程實績/5.堤壁修復及彩繪/image2.png"), alt: "堤壁修復及彩繪2" },
                    { src: require("../../assets/景觀工程實績/5.堤壁修復及彩繪/image3.png"), alt: "堤壁修復及彩繪3" },
                    { src: require("../../assets/景觀工程實績/5.堤壁修復及彩繪/image4.png"), alt: "堤壁修復及彩繪4" },
                ]
            },



        ]
    },
    volunteer: {
  
        title: "工程實積｜志工服務",
        projects: [
          {
    title: "花蓮救災",
    images: [
        { src: require("../../assets/志工服務/1.花蓮救災/image1.jpg"), alt: "花蓮救災1" },
        { src: require("../../assets/志工服務/1.花蓮救災/image2.jpg"), alt: "花蓮救災2" },
        { src: require("../../assets/志工服務/1.花蓮救災/image3.jpg"), alt: "花蓮救災3" },
        { src: require("../../assets/志工服務/1.花蓮救災/image4.jpg"), alt: "花蓮救災4" },
        { src: require("../../assets/志工服務/1.花蓮救災/image5.jpg"), alt: "花蓮救災5" },
        { src: require("../../assets/志工服務/1.花蓮救災/image6.jpg"), alt: "花蓮救災6" },
        { src: require("../../assets/志工服務/1.花蓮救災/image7.jpg"), alt: "花蓮救災7" },
        { src: require("../../assets/志工服務/1.花蓮救災/image8.jpg"), alt: "花蓮救災8" },
        { src: require("../../assets/志工服務/1.花蓮救災/image9.jpg"), alt: "花蓮救災9" },
        { src: require("../../assets/志工服務/1.花蓮救災/image10.jpg"), alt: "花蓮救災10" },
        { src: require("../../assets/志工服務/1.花蓮救災/image11.jpg"), alt: "花蓮救災11" },
    ]
},
{
    title: "98年莫拉克風災小林村",
    images: [
        { src: require("../../assets/志工服務/2.98年莫拉克風災小林村/imge1.png"), alt: "98年莫拉克風災小林村1" },
        { src: require("../../assets/志工服務/2.98年莫拉克風災小林村/imge2.png"), alt: "98年莫拉克風災小林村2" },
          { src: require("../../assets/志工服務/2.98年莫拉克風災小林村/imge3.png"), alt: "98年莫拉克風災小林村3" },
        { src: require("../../assets/志工服務/2.98年莫拉克風災小林村/imge4.png"), alt: "98年莫拉克風災小林村4" },
     
    ]
},

        ]
        

    },

};

const ConstructionProjects = () => {
    const [currentCategory, setCurrentCategory] = useState("building");

    const [loading, setLoading] = useState(false);

    const { title, projects } = allProjectCategories[currentCategory];
    // ⭐監聽分類切換
    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 300); // 可調整時間

        return () => clearTimeout(timer);
    }, [currentCategory]);

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
            {/* ⭐這裡包 loading */}
            {loading ? (
                <div className="projects-loading">資料載入中...</div>
            ) : (
                projects.map((proj, i) => (
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
                ))
            )}
        </div>
    );
};

export default ConstructionProjects;
