import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking: React.FC = () => {
  const [stars, setStars] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) => {
        if (prevStars < 5) {
          return prevStars + 1;
        } else {
          return 0;
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleBookingClick = () => {
    navigate('/appointment');
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 p-1 rounded-lg shadow-md bg-white max-w-3xl mx-auto"
     style={{ minHeight: '150px' }}>
      <div className="flex-1 bg-blue-900 text-white p-2 rounded-lg flex flex-col justify-between">
        <div>
          <h3 className="text-ls font-bold mb-1">ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY</h3>
          <p className="text-xs">Cắt xong trả tiền, hủy lịch không sao</p>
        </div>
        <div className="mt-1 flex justify-end">
          <button
            onClick={handleBookingClick}
            className="text-black font-bold px-3 py-1 rounded-md transition duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #DDEEFF, #99CCFF, #EECCFF)',
            }}
          >
            ĐẶT LỊCH NGAY
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white p-2 rounded-lg border border-gray-200"
      style={{ borderWidth: '1px' }}>
        <h3 className="text-ls font-bold mb-1 text-blue-900">MỜI ANH ĐÁNH GIÁ CHẤT LƯỢNG PHỤC VỤ</h3>
        <p className="text-xs text-gray-700 mb-1">
          Phản hồi của anh sẽ giúp chúng em cải thiện chất lượng dịch vụ tốt hơn
        </p>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-yellow-500 text-2xl transition-opacity duration-300 ${index < stars ? 'opacity-100' : 'opacity-0'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
