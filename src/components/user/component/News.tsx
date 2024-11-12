import React from 'react';

// Dữ liệu tĩnh tin tức
const newsList = [
  {
    id: '1',
    title: 'Booking Hair ra mắt cắt tóc thương gia dịch vụ 5 sao',
    description:
      'Booking Hair ra mắt cắt tóc thương gia dịch vụ 5 sao, mang đến một trải nghiệm đỉnh cao lần đầu xuất hiện tại Việt Nam',
    imageUrl: './Img/thuonggia5sao.png', // Thay đường dẫn ảnh của bạn
  },
  {
    id: '2',
    title: 'Booking Hair đưa thợ tóc làm việc tại top 3 thị trường khó tính nhất thế giới',
    description:
      'Booking Hair đưa thợ tóc làm việc tại top 3 thị trường khó tính nhất thế giới',
    imageUrl: './Img/30shine-djua-tho-toc-lam-viec-tai-top-3-thi-truong-kho-tinh-nhat-the-gioi.png', // Thay đường dẫn ảnh của bạn
  },
  {
    id: '3',
    title: 'Hair Stylist Booking Hair tham gia khóa đào tạo kỹ thuật salon chuyên nghiệp cấp cao',
    description:
      'Hair Stylist Booking Hair tham gia khóa đào tạo kỹ thuật salon chuyên nghiệp cấp cao toàn Châu Á',
    imageUrl: './Img/quan-ly-hair-salon-thumbnail.webp', // Thay đường dẫn ảnh của bạn
  },
  {
    id: '4',
    title: 'Booking Hair phát hành quản lý salon',
    description:
      'Booking Hair phát hành quản lý salon 8+',
    imageUrl: './Img/og-image.jpg', // Thay đường dẫn ảnh của bạn
  },
];

const News: React.FC = () => {
  return (
    <section className="py-8 px-4 bg-gray-50">
      {/* Tiêu đề */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">TIN TỨC MỚI NHẤT VỀ BOOKING HAIR</h2>
        </div>
      </div>
      
      {/* Danh sách tin tức */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {newsList.map((news) => (
          <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{news.title}</h3>
              <p className="text-xs text-gray-600">{news.description}</p>
            </div>
            <div className="px-4 pb-4">
              <a href="#" className="text-blue-700 text-sm hover:underline">
                Xem chi tiết &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
