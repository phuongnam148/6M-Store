/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import Featured from '../../components/featured/Featured';

import 'swiper/css';
import 'swiper/css/navigation';
import { Tabs } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { cards, projects } from '../../data';

import TrustedBy from '../../components/trustedBy/TrustedBy';
import './Home.scss';
import CatCard from '../../components/catCard/CatCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { depAdidas, giayTerrace, hangMoiVe } from '../../dumpdata';
import { Link } from 'react-router-dom';
const Home = () => {
const onChange = (key) => {
    console.log(key);
  };

  const formatProducts = (prods)=>{
    return prods.map((prod) => ({
      id: 1,
      category: prod.attribute_list.category,
      image_url:prod.product_description.description_assets.image_url,
      price: prod.pricing_information.currentPrice,
      title: prod.name ,
      badge_text: prod.attribute_list.badge_text,
    }))
  }

  const tabDetail = (prods) => {
    return (
      <Swiper
        rewind={true}
        spaceBetween={15}
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
      >
        {formatProducts(prods).map((card) => (
          <SwiperSlide key={card.id}>
            <CatCard item={card} key={card.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  const items = [
    { label: 'Hàng mới về', key: 'item-1', children: tabDetail(hangMoiVe) }, // remember to pass the key prop
    { label: 'Dép adidas', key: 'item-2', children: tabDetail(depAdidas) },
    // { label: 'Dép adidas', key: 'item-3', children: tabDetail() },
    { label: 'Giày Terrace', key: 'item-5', children: tabDetail(giayTerrace) },
  ];

  return (
    <div className="home">
      <Featured />

      {/* <TrustedBy /> */}

      <div className="slide mt-8 relative">
        <div className="container mt-8 relative">
          <Link to={'/products?category=1'} className='absolute top-0 right-0 z-10'>
            <p className='underline hover:bg-black hover:text-white'> Xem Thêm </p>
          </Link>
          <Tabs
            className='z-1'
            onChange={onChange}
            type="card"
            items={items}
            itemColor="white"
          />
        </div>
      </div>

      <div class="main">

<div class="banner">
    <div class="logo">
    <img src="./img/img.png" alt="" />
        <div class="content">
        <h2>YEEZY BOOST 350</h2><h2>V2 STEEL GREY</h2>  
            <div class="after_border">
                <div class="change">
                    <span>KHÁM PHÁ THÊM</span>
                    <box-icon color="white" name='right-arrow-alt'></box-icon>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="content_trailer">
<div class="video_trailer">
<video id="myVideo" autoPlay width="100%" src="./img/originals_ss24_2000running_hp_mh_d_3d7741f837.mp4" alt=""></video>

</div>
<div class="content_video">
    <h2>2000'S RUNNING</h2>
    <span>Tái hiện đôi giày chạy bộ biểu tượng <br />
        nhất đầu thiên niên kỷ này cho ngày nay.</span>
    <div class="after_border_video">
        <div class="change_video">
            <button>Mua Ngay</button>
            <box-icon name='right-arrow-alt'></box-icon>
        </div>
    </div>
    <div class="control_video" id="start-and-stop">
        <box-icon id="lines" name='play' color='#ffffff' ></box-icon>
        <box-icon color="white" id="plays" name='pause'></box-icon>
  </div>
</div>
</div>
</div>

      <div className="slide gray">
        <div className="container">
          <h1>Get inspired with projects made by our freelancers</h1>
          <Swiper
            rewind={true}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
          >
            {projects.map((card) => (
              <SwiperSlide key={card.id}>
                <ProjectCard item={card} key={card.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
