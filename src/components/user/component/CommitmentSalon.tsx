import React from 'react';

// Dữ liệu tĩnh cho các chính sách cam kết
const commitments = [
  {
    id: 1,
    title: '30',
    subtitle: 'ngày',
    description: 'Đổi/trả hàng miễn phí',
  },
  {
    id: 2,
    title: '07',
    subtitle: 'ngày',
    description: 'Bảo hành tóc miễn phí',
  },
  {
    id: 3,
    title: 'Chính sách đặc biệt',
    subtitle: '',
    description: 'Nếu khách chờ lâu',
  },
];

const CommitmentSalon: React.FC = () => {
  return (
    <section className="py-8">
      {/* Tiêu đề chính */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900">CAM KẾT 30SHINE CARE</h2>
        <p className="text-gray-600">Sự hài lòng của anh là ưu tiên hàng đầu của 30Shine</p>
      </div>

      {/* Hình ảnh chính */}
      <div className="mb-6">
        <img
          src="path-to-main-image.jpg" // Thay thế đường dẫn ảnh thực tế
          alt="Cam kết chất lượng"
          className="w-full h-auto rounded-lg"
        />
        <div className="text-white p-4 bg-gradient-to-t from-blue-900 to-transparent rounded-lg -mt-24 relative">
          <p>VÌ CHẤT LƯỢNG PHỤC VỤ LÀ HÀNG ĐẦU</p>
          <p>Áp dụng tại salon bất kỳ toàn hệ thống 30Shine</p>
        </div>
      </div>

      {/* Các cam kết */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {commitments.map((commitment) => (
          <div key={commitment.id} className="p-4 border-t border-gray-200">
            <h3 className="text-3xl font-bold text-blue-900">{commitment.title}</h3>
            <p className="text-lg font-semibold text-gray-600">{commitment.subtitle}</p>
            <p className="text-gray-600">{commitment.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitmentSalon;
