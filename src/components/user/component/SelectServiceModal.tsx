import React, { useEffect, useState } from 'react';
import { FiSearch, FiClock, FiCheck } from 'react-icons/fi';
import { serviceCategorieClientServices } from '../../../services/sevicesclient/seviceclientcategorie.services';
import { ServiceModel } from '../../../model/services.model';
import { formatCurrencyVND } from '../../../utils/moneyUtils';

interface SelectServiceModalProps {
  onClose: () => void;
  onSelect: (selectedServices: ServiceModel[]) => void;
  selectedServices: ServiceModel[];
}

const SelectServiceModal: React.FC<SelectServiceModalProps> = ({ onClose, onSelect, selectedServices }) => {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [tempSelectedServices, setTempSelectedServices] = useState<ServiceModel[]>([...selectedServices]); // Temporary selected services
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state

  // Fetch services when selectedCategoryId changes
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

  // Fetch categories on initial load
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

  // Calculate total amount
  useEffect(() => {
    const total = tempSelectedServices.reduce((sum, service) => sum + service.price, 0);
    setTotalAmount(total);
  }, [tempSelectedServices]);

  // Add service to the temporary selected services list
  const addService = (service: ServiceModel) => {
    if (!isSelected(service)) {
      setTempSelectedServices([...tempSelectedServices, service]);
    }
  };

  // Remove service from the temporary selected services list
  const removeService = (service: ServiceModel) => {
    const updatedServices = tempSelectedServices.filter(
      (selectedService) => selectedService.serviceId !== service.serviceId
    );
    setTempSelectedServices(updatedServices);
  };

  // Check if a service is already selected
  const isSelected = (service: ServiceModel) => {
    return tempSelectedServices.some((selectedService) => selectedService.serviceId === service.serviceId);
  };

  // Handle the save action and close the modal
  const handleSave = () => {
    onSelect(tempSelectedServices); // Save selected services
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto border border-gray-100 overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base font-semibold text-center flex-grow text-center">Chọn dịch vụ</h1>
          <button onClick={onClose} className="text-blue-600 text-lg">×</button>
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ, nhóm dịch vụ"
              className="w-full p-3 pl-10 border rounded-lg bg-gray-100 text-sm text-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Chọn danh mục và dịch vụ */}
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

       <div className="flex justify-center flex-wrap gap-4">
  {services
    .filter((service) =>
      service.nameService.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((service) => (
      <div
        key={service.serviceId}
        className="border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full sm:w-[48%] max-w-[300px] bg-white"
      >
        <img
          src={service.imageServices ?? 'https://via.placeholder.com/150'}
          alt={service.nameService || 'Service Image'}
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          <h3 className="text-blue-600 text-sm font-semibold mb-1">{service.nameService}</h3>
          <p className="text-gray-500 mb-2 text-xs">{service.description}</p>
          <p className="text-xs text-gray-600 flex items-center">
            <FiClock className="mr-1" /> {service.duration}p
          </p>

          <p className="font-bold text-green-500 text-sm mt-3">{formatCurrencyVND(service.price)}</p>

          {isSelected(service) ? (
            <button
              type="button"
              className="bg-gray-400 text-white text-xs p-2 mt-3 w-full rounded-lg flex items-center justify-center"
              onClick={() => removeService(service)}
            >
              <FiCheck className="mr-1" /> Đã thêm
            </button>
          ) : (
            <button
              type="button"
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

        {/* Hiển thị dịch vụ đã chọn và tổng thanh toán */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="text-sm font-bold text-gray-600">
            Đã chọn {tempSelectedServices.length} dịch vụ
          </div>
          <div className="text-sm font-bold text-gray-600">
            Tổng thanh toán: <span className="text-green-500">{formatCurrencyVND(totalAmount)}</span>
          </div>
        </div>

        <div className="flex justify-end items-center mt-6">
          <button
            type="button" // Đặt loại nút là "button" để không submit form
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
            onClick={handleSave}
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectServiceModal;
