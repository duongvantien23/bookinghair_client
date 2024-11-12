import React from 'react';

// Dữ liệu tĩnh của sản phẩm
const products = [
  {
    id: 1,
    name: 'Sữa Rửa Mặt Tràm Trà Skin&Dr Tea tree 100g',
    price: '229.000 đ',
    imageUrl: 'path/to/product1.jpg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: 2,
    name: 'Sữa Dưỡng Da Grinif All In One 4 Gentleman',
    price: '399.000 đ',
    imageUrl: 'path/to/product2.jpg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: 3,
    name: 'Sáp vuốt tóc nam Kevin Murphy Rough Rider',
    price: '399.000 đ',
    imageUrl: 'path/to/product3.jpg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: 4,
    name: 'Sáp vuốt tóc Glanzen Clay Wax - Giữ nếp tối đa',
    price: '299.000 đ',
    imageUrl: 'path/to/product4.jpg', // Thay đường dẫn ảnh của bạn
  },
  {
    id: 5,
    name: 'Gôm xịt giữ nếp tóc Glanzen 30Shine phần cứng',
    price: '189.000 đ',
    imageUrl: 'path/to/product5.jpg', // Thay đường dẫn ảnh của bạn
  },
];

const ProductShop: React.FC = () => {
  return (
    <section className="py-8">
      {/* Tiêu đề và mô tả */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900">30SHINE SHOP</h2>
        <p className="text-sm text-gray-500">Mỹ phẩm nam cao cấp chính hãng</p>
      </div>

      {/* Banner quảng cáo */}
      <div className="mb-8">
        <img
          src="path/to/banner.jpg" // Thay đường dẫn ảnh của bạn
          alt="Banner"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShop;
