import React from 'react';

const TopHairStylist: React.FC = () => {
  // Dữ liệu tĩnh
  const hairStylists = [
    {
      id: '1',
      name: 'Thủy Vũ',
      address: '80 Trần Phú, Thanh Hóa',
      imageUrl: './Img/stylist1.jpg', // Thay đường dẫn ảnh của bạn
    },
    {
      id: '2',
      name: 'Mạnh Nguyễn',
      address: '80 Trần Phú, Thanh Hóa',
      imageUrl: './Img/stylist2.jpg', // Thay đường dẫn ảnh của bạn
    },
    {
      id: '3',
      name: 'Huy Nguyễn',
      address: '8 Châu Văn Liêm, HCM',
      imageUrl: './Img/stylist3.jpg', // Thay đường dẫn ảnh của bạn
    },
    // {
    //   id: '4',
    //   name: 'Cường Lê',
    //   address: '11 Phan Kế Toại, HCM',
    //   imageUrl: './Img/stylist4.jpg', // Thay đường dẫn ảnh của bạn
    // },
  ];

  return (
    <section className="py-4 px-6 bg-gray-50 max-w-4xl mx-auto m-8">
      {/* Header section */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-blue-300 mr-2"></div>
        <h2 className="text-xl font-bold text-blue-900">TOP THỢ CẮT TRONG THÁNG</h2>
      </div>
      <p className="text-gray-500 mb-4">Đội ngũ Stylist dày dặn kinh nghiệm</p>

      {/* Hair stylists list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {hairStylists.map((stylist) => (
          <div
            key={stylist.id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
            style={{ width: '240px', height: '300px' }}
          >
            <div className="relative">
              <img
                src={stylist.imageUrl}
                alt={stylist.name}
                className="w-full h-48 object-cover object-top" // Changed to "object-top" to show face
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-sl font-bold text-blue-900">{stylist.name}</h3>
              <p
                className="text-xs text-gray-600 mt-3 overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}
              >
                {stylist.address}
              </p>
              <button
                className="text-xs text-blue-900 font-semibold hover:underline mt-4 block float-right"
              >
                Xem chi tiết →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopHairStylist;
