import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceModel } from '../../model/services.model';
import { ServiceDetailsModel } from '../../model/servicedetail.model';
import { serviceServices } from '../../services/sevice.services';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceModel | null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailsModel[]>([]);

  useEffect(() => {
    const fetchServiceAndDetails = async () => {
      try {
        const serviceData = await serviceServices.getById(Number(id));
        setService(serviceData);

        const detailsData = await serviceServices.getServiceDetailsByServiceId(Number(id));
        setServiceDetails(detailsData);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    if (id) {
      fetchServiceAndDetails();
    }
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-1 h-6 bg-blue-300 mr-2"></div>
          <h2 className="text-2xl font-bold text-blue-900">QUY TRÌNH DỊCH VỤ</h2>
        </div>
        <p className="text-sm text-gray-700">
          {`Dịch vụ ${service?.nameService} - ${service?.description || 'Mang đến trải nghiệm dịch vụ đỉnh cao lần đầu tiên xuất hiện tại Việt Nam'}`}
        </p>
      </div>
      {serviceDetails.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {serviceDetails.map((detail) => (
            <div key={detail.serviceDetailId} className="text-center">
              <img
                src={detail.imageDetails || 'path/to/default-image.png'}
                alt={detail.stepDescription}
                className="w-full h-40 object-cover rounded-md mb-2"
                style={{ aspectRatio: '1/1' }} 
              />
              <h3 className="text-md font-bold text-blue-900 text-center">{detail.stepDescription}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-5">Không có quy trình nào được tìm thấy.</p>
      )}
      <div className="mt-8 text-center">
        <button className="bg-blue-900 text-white font-bold px-6 py-2 rounded-full">
          ĐẶT LỊCH NGAY
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
