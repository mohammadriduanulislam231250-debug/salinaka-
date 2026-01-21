import React from 'react';
import Slider from 'react-slick';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SHOP } from '@/constants/routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bannerImg from '@/images/banner-girl.png';
import bannerImg2 from '@/images/banner-guy.png';

const BannerSlide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        <div className="banner-slide-item">
          <div className="banner">
            <div className="banner-desc">
              <h1 className="text-thin">
                <strong>See</strong>
                &nbsp;everything with&nbsp;
                <strong>Clarity</strong>
              </h1>
              <p>
                Buying eyewear should leave you happy and good-looking, with money in your pocket.
                Glasses, sunglasses, and contacts—we’ve got your eyes covered.
              </p>
              <br />
              <Link to={SHOP} className="button">
                Shop Now &nbsp;
                <ArrowRightOutlined />
              </Link>
            </div>
            <div className="banner-img">
              <img src={bannerImg} alt="" />
            </div>
          </div>
        </div>
        <div className="banner-slide-item">
          <div className="banner">
            <div className="banner-desc">
              <h1 className="text-thin">
                <strong>Summer</strong>
                &nbsp;Sale is&nbsp;
                <strong>Live</strong>
              </h1>
              <p>
                Get up to 50% off on selected items. Don't miss out on the hottest trends of the
                season. Limited stock available!
              </p>
              <br />
              <Link to={SHOP} className="button">
                Shop Now &nbsp;
                <ArrowRightOutlined />
              </Link>
            </div>
            {/* Fallback to same image if bannerImg2 doesn't exist, but I will try to use a placeholder or conditional */}
            <div className="banner-img">
              <img src={bannerImg} alt="" style={{ transform: 'scaleX(-1)' }} />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlide;
