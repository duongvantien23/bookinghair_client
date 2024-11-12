import React from 'react';

// Dữ liệu tĩnh cho các sản phẩm bán chạy
const bestSellingProducts = [
  {
    id: 1,
    name: 'Combo Giữ nếp X2',
    price: '618.000 đ',
    imageUrl: 'path/to/product1.jpg', // Thay đường dẫn ảnh sản phẩm
  },
  {
    id: 2,
    name: 'Combo Giữ nếp X2',
    price: '488.000 đ',
    imageUrl: 'path/to/product2.jpg', // Thay đường dẫn ảnh sản phẩm
  },
  {
    id: 3,
    name: 'Combo Tóc bồng bềnh Giữ nếp nhẹ tênh',
    price: '498.000 đ',
    imageUrl: 'path/to/product3.jpg', // Thay đường dẫn ảnh sản phẩm
  },
  {
    id: 4,
    name: 'Combo Tóc bồng bềnh Giữ nếp nhẹ tênh',
    price: '558.000 đ',
    imageUrl: 'path/to/product4.jpg', // Thay đường dẫn ảnh sản phẩm
  },
];

const ProductBestSale: React.FC = () => {
  return (
    <section className="py-8">
      {/* Tiêu đề phần Sản phẩm bán chạy */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900">SẢN PHẨM BÁN CHẠY ĐƯỢC CẬP NHẬT LIÊN TỤC</h2>
      </div>

      {/* Danh sách sản phẩm bán chạy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellingProducts.map((product) => (
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

export default ProductBestSale;
