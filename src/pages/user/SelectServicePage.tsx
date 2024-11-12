import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiClock, FiCheck } from 'react-icons/fi';
import { serviceCategorieClientServices } from '../../services/sevicesclient/seviceclientcategorie.services';
import { ServiceModel } from '../../model/services.model';
import { formatCurrencyVND } from '../../utils/moneyUtils';

const SelectServicePage: React.FC = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<ServiceModel[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceModel[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (selectedCategoryId) {
          const serviceData = await serviceCategorieClientServices.getServicesByCategoryId(selectedCategoryId);
          setServices(serviceData);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [selectedCategoryId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await serviceCategorieClientServices.getAll();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const addServiceToLocalStorage = (services: ServiceModel[]) => {
    localStorage.setItem('selectedServices', JSON.stringify(services));
  };
  
  const addService = (service: ServiceModel) => {
    const updatedServices = [...selectedServices, service];
    setSelectedServices(updatedServices);
    setTotalAmount(updatedServices.reduce((total, srv) => total + srv.price, 0));
    addServiceToLocalStorage(updatedServices);
  };
  
  const removeService = (service: ServiceModel) => {
    const updatedServices = selectedServices.filter(
      (selectedService) => selectedService.serviceId !== service.serviceId
    );
    setSelectedServices(updatedServices);
    setTotalAmount(updatedServices.reduce((total, srv) => total + srv.price, 0));
    addServiceToLocalStorage(updatedServices);
  };  
  
  const isSelected = (service: ServiceModel) => {
    return selectedServices.some((selectedService) => selectedService.serviceId === service.serviceId);
  };

  const handleComplete = () => {
    navigate('/appointment', { state: { selectedServices } });
  };

  return (
    <div className="min-h-max flex justify-center items-center">
      <div className="bg-white-100 shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate(-1)} className="text-blue-600 text-lg">
            ←
          </button>

          <h1 className="text-base font-semibold text-center">Chọn dịch vụ</h1>

          <div className="w-8"></div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ, nhóm dịch vụ"
              className="w-full p-3 pl-10 border rounded-lg bg-gray-100 text-sm text-gray-600"
            />
          </div>
        </div>

        <div className="mb-6 flex justify-end">
          <select
            className="p-2 border rounded text-sm"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          >
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          {categories.length > 0 && (
            <div className="flex flex-col mb-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center text-left">
                <span className="block w-1 h-6 bg-blue-400 mr-2"></span>
                {categories.find((cat) => cat.categoryId === selectedCategoryId)?.categoryName}
              </h2>
            </div>
          )}

          {services.length === 0 ? (
            <p className="text-center text-gray-600">Không có dịch vụ nào liên quan đến danh mục này.</p>
          ) : (
            <div className="flex justify-center flex-wrap">
              {services.map((service) => (
                <div
                  key={service.serviceId}
                  className="border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full max-w-[250px] mx-4 mb-6 bg-white"
                  style={{ minHeight: '310px' }}
                >
                  {service.imageServices && (
                    <img
                      src={service.imageServices}
                      alt={service.nameService}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <h3 className="text-blue-600 text-sm font-semibold mb-1">{service.nameService}</h3>
                    <p className="text-gray-500 mb-2 text-xs">{service.description}</p>

                    <p className="text-xs text-gray-600 flex items-center">
                      <FiClock className="mr-1" /> {service.duration}p
                    </p>

                    <div className="text-center mt-2">
                      <p className="text-xs text-gray-600 mt-3">Tiêu chuẩn</p>
                      <p className="font-bold text-green-500 text-sm mt-3">{formatCurrencyVND(service.price)}</p>
                    </div>

                    {isSelected(service) ? (
                      <button
                        className="bg-gray-400 text-white text-xs p-2 mt-3 w-full rounded-lg flex items-center justify-center"
                        onClick={() => removeService(service)}
                      >
                        <span className="flex items-center justify-center bg-white text-blue-600 rounded-full w-3 h-3 mr-2">
                          <FiCheck />
                        </span>
                        Đã thêm
                      </button>
                    ) : (
                      <button
                        className="bg-blue-600 text-white text-xs p-2 mt-3 w-full rounded-lg"
                        onClick={() => addService(service)}
                      >
                        Thêm dịch vụ
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="text-blue-600 text-sm">
            <a href="#services">Đã chọn {selectedServices.length} dịch vụ</a>
          </div>
          <div className="text-sm text-gray-600">Tổng thanh toán</div>
          <div className="text-lg font-bold text-green-500">{formatCurrencyVND(totalAmount)} OK</div>
          <button
            className={`${
              selectedServices.length > 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
            } px-4 py-2 rounded-lg ml-4`}
            disabled={selectedServices.length === 0}
            onClick={handleComplete}
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectServicePage;
