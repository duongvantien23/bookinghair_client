import React from 'react';

// Dữ liệu tĩnh cho phần hình ảnh và mô tả
const technologyData = [
  {
    id: 1,
    title: 'Không gian thoáng, mát, sạch',
    imageUrl: 'path-to-image-1.jpg', // Thay đường dẫn ảnh thực tế
  },
  {
    id: 2,
    title: 'Trang thiết bị hiện đại',
    imageUrl: 'path-to-image-2.jpg', // Thay đường dẫn ảnh thực tế
  },
  {
    id: 3,
    title: 'Ứng dụng đặt lịch độc quyền',
    imageUrl: 'path-to-image-3.jpg', // Thay đường dẫn ảnh thực tế
  },
];

const TechnologySalon: React.FC = () => {
  return (
    <section className="py-8">
      {/* Tiêu đề phần Không gian & Công nghệ */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900">KHÔNG GIAN & CÔNG NGHỆ</h2>
        <p className="text-gray-600">Trải nghiệm không gian mở</p>
      </div>

      {/* Hình ảnh lớn chính */}
      <div className="mb-6">
        <img
          src="path-to-main-image.jpg" // Thay đường dẫn ảnh chính thực tế
          alt="Không gian chính"
          className="w-full h-auto rounded-lg"
        />
        <div className="text-white p-4 bg-gradient-to-t from-blue-900 to-transparent rounded-lg -mt-24 relative">
          <p>Vượt qua giới hạn của tiệm tóc truyền thống, 30Shine tạo dựng không gian trải nghiệm hoàn toàn mới với trang thiết bị công nghệ hiện đại</p>
        </div>
      </div>

      {/* Danh sách hình ảnh nhỏ bên dưới */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {technologyData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <p className="text-gray-800">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySalon;
