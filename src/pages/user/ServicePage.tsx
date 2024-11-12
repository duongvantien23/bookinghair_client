import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceModel } from '../../model/services.model';
import { ServiceCategorieModel } from '../../model/servicecategorie.model';
import { serviceCategorieServices } from '../../services/servicecategorie.services';

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [categories, setCategories] = useState<ServiceCategorieModel[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(Number(id) || null);
  const [category, setCategory] = useState<ServiceCategorieModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await serviceCategorieServices.getAll();
        setCategories(categoryData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryAndServices = async () => {
      try {
        const categoryIdToFetch = selectedCategoryId || Number(id);
        if (categoryIdToFetch) {
          const categoryData = await serviceCategorieServices.getById(categoryIdToFetch);
          setCategory(categoryData);

          const servicesData = await serviceCategorieServices.getServicesByCategoryId(categoryIdToFetch);
          setServices(servicesData);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh mục và dịch vụ:', error);
      }
    };

    fetchCategoryAndServices();
  }, [selectedCategoryId, id]);

  const handleLearnMoreClick = (serviceId: number) => {
    navigate(`/service-detail/${serviceId}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedCategoryId(selectedId);
    setServices([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-blue-300 mr-2"></div>
            <h2 className="text-2xl font-bold text-blue-900">{category?.categoryName || 'Dịch Vụ'}</h2>
          </div>
          <div className="flex items-center">
            <select
              className="border border-gray-300 rounded-md px-2 py-1 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              style={{ minWidth: '180px' }}
              onChange={handleCategoryChange}
              value={selectedCategoryId || ''}
            >
              <option value="">Chọn dịch vụ</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-700">
          {category?.description || 'Trải nghiệm dịch vụ tuyệt vời tại đây'}
        </p>
      </div>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.serviceId}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
              style={{ minHeight: '320px', maxWidth: '280px' }}
            >
              <div>
                <h3 className="text-ls font-bold text-blue-900">{service.nameService}</h3>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                <div className="relative mt-3">
                  <img
                    src={service.imageServices || 'path/to/default-image.png'}
                    alt={service.nameService}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span
                  className="px-3 py-1 border border-blue-900 rounded-full text-blue-900"
                  style={{ fontSize: '0.680rem' }}
                >
                  {service.duration} Phút
                </span>
                <a
                  onClick={() => handleLearnMoreClick(service.serviceId)}
                  className="text-blue-900 font-semibold text-xs hover:underline cursor-pointer"
                >
                  Tìm hiểu thêm →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Không có dịch vụ nào được tìm thấy.</p>
      )}
    </div>
  );
};

export default ServicePage;
