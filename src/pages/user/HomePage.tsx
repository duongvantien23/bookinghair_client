import React from 'react';
import Booking from '../../components/user/component/Booking';
import Service from '../../components/user/component/Service';
import TopHairStylist from '../../components/user/component/TopHairStylist';
import News from '../../components/user/component/News';
import Partner from '../../components/user/component/Partner';
import Find from '../../components/user/component/FindNearbySalon';


const HomePage: React.FC = () => {
  return (
    <div>
      {/* Banner */}
      <section className="mb-8">
        <div className="relative h-64 rounded-lg shadow-md">
          <img
            src="./Img/20231027_banner_uon_dinh_hinh_1_w.png"
            alt="Booking Hair Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Đặt lịch cắt tóc */}
      <Booking/>
      {/* Dịch vụ tóc*/}
      <Service/>
      {/* Dịch vụ tóc*/}
      <TopHairStylist/>
      {/* Dịch vụ tóc*/}
      <News/>
      {/* Dịch vụ tóc*/}
      <Partner/>
      {/* Dịch vụ tóc*/}
      <Find/>
    </div>
  );
};

export default HomePage;
