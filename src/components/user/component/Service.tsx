import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCategorieModel } from '../../../model/servicecategorie.model';
import { serviceCategorieServices } from '../../../services/servicecategorie.services';

const Service: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategorieModel[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await serviceCategorieServices.getAll();
        setCategories(data.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching service categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const handleLearnMoreClick = (categoryId: number) => {
    navigate(`/service/${categoryId}`); 
  };

  return (
    <section className="py-4 px-6 bg-gray-50 max-w-4xl mx-auto m-8"> 
    <div className="flex items-center mb-6">
      <div className="w-1 h-6 bg-blue-300 mr-2"></div> 
      <h2 className="text-xl font-bold text-blue-900">DỊCH VỤ TÓC</h2>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="bg-white rounded-lg overflow-hidden shadow-md"
            style={{ width: '240px', height: '300px' }} 
          >
            <div className="relative">
              <img
                src={category.imageServiceCategory || 'path/to/default-image.png'}
                alt={category.categoryName}
                className="w-full h-48 object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent"></div>
            </div>
            <div className="p-3 text-center">
              <h3 className="text-sl font-bold text-blue-900">{category.categoryName}</h3> 
              <p
                className="text-xs text-gray-600 mt-3 overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1, 
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}
              >
                {category.description}
              </p>
              <button
                onClick={() => handleLearnMoreClick(category.categoryId)}
                className="text-xs text-blue-900 font-semibold hover:underline mt-4 block float-right"
              >
                Tìm hiểu thêm →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
