import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner: React.FC = () => {
  // Cấu hình carousel (số ảnh chạy cùng lúc, tốc độ chuyển đổi, tự động chạy, v.v.)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Hiển thị 3 ảnh một lúc
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,  // Màn hình lớn
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,  // Màn hình trung bình (tablet)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,  // Màn hình nhỏ (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="w-full bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div className="p-2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="/path-to-banner-image1.jpg"  // Thay thế bằng đường dẫn hình ảnh thực tế
                alt="Banner 1"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 lg:p-16">
                <h2 className="text-yellow-400 text-lg lg:text-2xl font-semibold">RA MẮT CÔNG NGHỆ</h2>
                <h1 className="text-white text-2xl lg:text-4xl font-bold">UỐN ĐỊNH HÌNH CHUYÊN NAM ĐẦU TIÊN TẠI VIỆT NAM</h1>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="p-2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="/path-to-banner-image2.jpg"
                alt="Banner 2"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 lg:p-16">
                <h2 className="text-yellow-400 text-lg lg:text-2xl font-semibold">CÔNG NGHỆ MỚI</h2>
                <h1 className="text-white text-2xl lg:text-4xl font-bold">THIẾT KẾ KIỂU TÓC CHUYÊN NGHIỆP</h1>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="p-2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="/path-to-banner-image3.jpg"
                alt="Banner 3"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 lg:p-16">
                <h2 className="text-yellow-400 text-lg lg:text-2xl font-semibold">DỊCH VỤ MỚI</h2>
                <h1 className="text-white text-2xl lg:text-4xl font-bold">CHĂM SÓC TÓC TOÀN DIỆN</h1>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="p-2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="/path-to-banner-image4.jpg"
                alt="Banner 4"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 lg:p-16">
                <h2 className="text-yellow-400 text-lg lg:text-2xl font-semibold">PHONG CÁCH TÓC MỚI</h2>
                <h1 className="text-white text-2xl lg:text-4xl font-bold">THỂ HIỆN CÁ TÍNH</h1>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
