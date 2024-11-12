import React from 'react';

// Dữ liệu tĩnh đối tác
const partnersList = [
  {
    id: '1',
    name: 'Dr.FORHAIR',
    description: 'Top 1 dầu gội ngăn rụng tóc chứng nhận bởi Viện nghiên cứu da liễu quốc tế.',
    logoUrl: './Img/7.jpeg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: '2',
    name: 'Blairsom',
    description: 'Được phát triển bởi chuyên gia với hơn 50 năm kinh nghiệm trong ngành hóa mỹ phẩm tóc.',
    logoUrl: './Img/9.jpeg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: '3',
    name: 'LoveWarmth',
    description: 'Thương hiệu xuất sắc về các sản phẩm chăm sóc tóc chuyên nghiệp trong suốt nhiều năm.',
    logoUrl: './Img/8.jpeg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: '4',
    name: 'ATS for man',
    description: 'Thương hiệu mỹ phẩm hàng đầu Hàn Quốc có hơn 32 năm kinh nghiệm trong ngành.',
    logoUrl: './Img/6.jpeg', // Thay đường dẫn ảnh của bạn
  },
];

const Partner: React.FC = () => {
  return (
    <section className="py-8 px-4 bg-gray-50">
      {/* Tiêu đề */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-900">CHẤT LƯỢNG & UY TÍN</h2>
        <p className="text-sm text-gray-600">
          Kết hợp với các đối tác lớn, uy tín, bao gồm các nhãn sản phẩm chất lượng được sử dụng trong quy trình các dịch vụ đang vận hành tại hệ thống salon.
        </p>
      </div>
      
      {/* Danh sách đối tác */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {partnersList.map((partner) => (
          <div key={partner.id} className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="w-full h-20 object-contain mb-4"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{partner.name}</h3>
              <p className="text-xs text-gray-600">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partner;
