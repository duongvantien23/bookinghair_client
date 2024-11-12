import React from 'react';

const salonData = [
  {
    id: 1,
    city: 'Hà Nội',
    salons: '20+ Salon',
    image: './Img/ho-hoan-kiem-2.jpg',
  },
  {
    id: 2,
    city: 'TP. Hồ Chí Minh',
    salons: '50+ Salon',
    image: './Img/dien-tich-cac-quan-tai-ho-chi-minh-1-16717832922811126226268.jpg',
  },
  {
    id: 3,
    city: 'Đà Nẵng',
    salons: '2+ Salon',
    image: './Img/cauvang-1654247842-9403-1654247849.jpg',
  },
  {
    id: 4,
    city: 'Các Thành phố khác',
    salons: '20+ Salon',
    image: './Img/cacthanhpho.jpg',
  },
];

const FindNearbySalons: React.FC = () => {
  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900">TÌM BOOKING HAIR GẦN NHẤT</h2>
        <p className="text-gray-600">Để xe thuận tiện an toàn, bản đồ dẫn đường chi tiết (hàng trăm Salon)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {salonData.map((salon) => (
          <div key={salon.id} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={salon.image} alt={salon.city} className="w-full h-32 object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
              <h3 className="font-bold text-lg">{salon.city}</h3>
              <p>{salon.salons}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <a href="#" className="text-blue-900 font-semibold hover:underline">Xem tất cả &gt;</a>
      </div>
    </section>
  );
};

export default FindNearbySalons;
