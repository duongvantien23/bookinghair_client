import React, { useState, useEffect } from 'react';
import { FiScissors, FiCalendar, FiMapPin, FiUser, FiCheck,FiChevronDown} from 'react-icons/fi';
import { cityServices } from '../../services/sevicesclient/citiesclient.services';
import { districtServices } from '../../services/sevicesclient/districtsclient.services';
import { salonServices } from '../../services/sevicesclient/salonclient.services';
import { hairstylistClientServices } from '../../services/sevicesclient/hairstylistclient.services';
import { timeSlotClientServices } from '../../services/sevicesclient/timeslotclient.services';
import { formatCurrencyVND } from '../../utils/moneyUtils';
import SelectServiceModal from '../../components/user/component/SelectServiceModal'; 
import { TimeSlotModel } from '../../model/timeslot.model';

const AppointmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [salon, setSalon] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [salons, setSalons] = useState<any[]>([]);
  const [hairstylists, setHairstylists] = useState<any[]>([]);
  const [allHairstylists, setAllHairstylists] = useState<any[]>([]);
  const [allSalons, setAllSalons] = useState<any[]>([]);
  const [showHairstylists, setShowHairstylists] = useState(false);
  const [selectedHairstylist, setSelectedHairstylist] = useState<any | null>(null);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false); // Modal state
  const [selectedDate, setSelectedDate] = useState('today'); // Chọn mặc định là hôm nay
  const [timeSlots, setTimeSlots] = useState<TimeSlotModel[]>([]); // Lưu các khung giờ
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [isTimeSlotsVisible, setIsTimeSlotsVisible] = useState(false); 
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlotModel | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(true);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityData = await cityServices.getAll();
        setCities(cityData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const salonData = await salonServices.getAll();
        setAllSalons(salonData);
        setSalons(salonData);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };
    fetchSalons();
  }, []);

  useEffect(() => {
    const fetchHairstylists = async () => {
      try {
        const hairstylistData = await hairstylistClientServices.getAll();
        setAllHairstylists(hairstylistData);
      } catch (error) {
        console.error('Error fetching hairstylists:', error);
      }
    };
    fetchHairstylists();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (city) {
        try {
          const districtData = await districtServices.getAll();
          const filteredDistricts = districtData.filter((d: any) => d.cityId === parseInt(city));
          setDistricts(filteredDistricts);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      } else {
        setDistricts([]);
        setSalons(allSalons);
      }
    };
    fetchDistricts();
  }, [city]);

  useEffect(() => {
    if (district) {
      const filteredSalons = allSalons.filter((salon) => salon.districtId === parseInt(district));
      setSalons(filteredSalons);
    } else {
      setSalons(allSalons);
    }
  }, [district, allSalons]);

  useEffect(() => {
    if (salon) {
      const filteredHairstylists = allHairstylists.filter((hairstylist) => hairstylist.salonId === parseInt(salon));
      setHairstylists(filteredHairstylists);
    } else {
      setHairstylists([]);
    }
  }, [salon, allHairstylists]);

  const completeStep = (step: number) => {
    if (step === currentStep) {
      setCurrentStep(step + 1);
    }
  };
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (salon) {
        try {
          const timeSlotsData = selectedDate === 'today'
            ? await timeSlotClientServices.getTimeSlotsForToday(parseInt(salon))
            : await timeSlotClientServices.getTimeSlotsForTomorrow(parseInt(salon));
          setTimeSlots(timeSlotsData); 
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      }
    };    
    fetchTimeSlots();
  }, [salon, selectedDate]);  
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validatePhoneNumber(phone) || !validateEmail(email)) {
      alert('Vui lòng kiểm tra lại thông tin.');
      return;
    }
    alert('Đặt lịch thành công!');
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    if (!validatePhoneNumber(value)) {
      setErrors((prev) => ({ ...prev, phone: 'Số điện thoại không hợp lệ.' }));
    } else {
      setErrors((prev) => {
        const { phone, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Email không hợp lệ.' }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSalonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSalon = event.target.value;
    setSalon(selectedSalon);
    if (district && selectedSalon) {
      completeStep(1);
    }
  };

  const handleHairstylistClick = () => {
    setShowHairstylists(!showHairstylists);
  };

  const selectHairstylist = (stylist: any) => {
    setSelectedHairstylist(stylist);
    setShowHairstylists(false); 
    completeStep(2); 
  };
  // Modal open/close handlers
const handleOpenServiceModal = () => {
  setIsServiceModalOpen(true);
};

const handleCloseServiceModal = () => {
  setIsServiceModalOpen(false);
};

const handleServiceSelect = (selectedServices: any[]) => {
  setSelectedServices(selectedServices);
  setIsServiceModalOpen(false);
  if (selectedServices.length > 0) {
    completeStep(3);
    setIsTimeSlotsVisible(true); 
  }
};
const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedDate(event.target.value);
  completeStep(4);
};
const formatDateHeader = (dateType: string) => {
  const today = new Date();
  const targetDate = dateType === 'today' ? today : new Date(today.getTime() + 86400000);
  const dayOfWeek = targetDate.getDay();
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;

  const daysInVietnamese = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dayLabel = dateType === 'today' ? 'Hôm nay' : 'Ngày mai';

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const dayTypeLabel = isWeekend ? 'Cuối tuần' : 'Ngày thường';

  return {
    label: `${dayLabel}, ${daysInVietnamese[dayOfWeek]} (${day}/${month})`,
    dayTypeLabel: dayTypeLabel,
    dayTypeColor: isWeekend ? 'bg-red-600 text-[8px] px-1 py-0.25' : 'bg-green-500 text-[8px] px-1 py-0.25'
  };  
};
const toggleDateOptions = () => {
  setShowDateOptions(!showDateOptions);
};
const handleTimeSlotSelect = (slot:TimeSlotModel) => {
  if (slot.isAvailable) {
    setSelectedTimeSlot(slot); 
    setShowTimeSlots(false); 
  }
};

  return (
    <div className="max-w-2xl mx-auto mt-10 p-10 bg-white shadow-lg rounded-md mb-10" style={{ minHeight: '750px' }}>
      <h2 className="text-center text-2xl font-bold mb-6 text-blue-600">ĐẶT LỊCH GIỮ CHỖ</h2>
      <p className="text-center mb-6 text-gray-600 text-sm">
        Hãy liên hệ ngay với chúng tôi để được tư vấn sớm nhất về các mẫu tóc hot nhất hiện nay!
      </p>

      <form onSubmit={handleFormSubmit}>
        {/* Bước 1: Chọn Tỉnh/Thành phố và Quận/Huyện */}
        <div className="flex items-start mb-6 relative">
          <div className="mr-4 mt-2 relative">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 border-blue-600`}>
              {currentStep > 0 ? <FiCheck size={12} /> : <div className={`w-1.5 h-1.5 rounded-full ${currentStep === 0 ? 'bg-blue-600 animate-ping' : 'bg-gray-300'}`} />}
            </div>
            {currentStep > 0 && <div className="absolute left-2 top-5 h-full border-l-2 border-blue-600" style={{ height: 'calc(100% + 35px)' }}></div>}
          </div>
          <div className="w-full flex space-x-4">
            <div className="w-1/2">
              <label className="block text-xs font-medium mb-1 text-blue-600">Tỉnh/Thành Phố</label>
              <select
                className="w-full p-1 border rounded text-xs"
                onChange={(e) => {
                  setCity(e.target.value);
                  completeStep(0);
                }}
              >
                <option value="">Chọn Tỉnh/Thành Phố</option>
                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-xs font-medium mb-1 text-blue-600">Quận/Huyện</label>
              <select
                className="w-full p-1 border rounded text-xs"
                onChange={(e) => {
                  setDistrict(e.target.value);
                  completeStep(0);
                }}
                disabled={!city}
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.districtId} value={district.districtId}>
                    {district.districtName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bước 2: Chọn Salon */}
        <div className="flex items-start mb-4 relative">
          <div className="mr-4 mt-2 relative">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'border-2 border-blue-600' : 'hidden'}`}>
              {currentStep > 1 ? <FiCheck size={12} /> : <div className={`w-1.5 h-1.5 rounded-full ${currentStep === 1 ? 'bg-blue-600 animate-ping' : 'bg-gray-300'}`} />}
            </div>
            {currentStep > 1 && <div className="absolute left-2 top-5 h-full border-l-2 border-blue-600" style={{ height: 'calc(100% + 15px)' }}></div>}
          </div>
          <div className="w-full">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <FiMapPin className="text-lg mr-2 text-gray-600" />
              <select className="w-full p-1 border-none bg-transparent text-xs" onChange={handleSalonChange} disabled={!district}>
                <option value="">Chọn Salon</option>
                {salons.length > 0 ? (
                  salons.map((salon) => (
                    <option key={salon.salonId} value={salon.salonId}>
                      {salon.nameSalon}
                    </option>
                  ))
                ) : (
                  <option value="">Không có salon nào</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Bước 3: Chọn Thợ Cắt Tóc */}
        <div className="flex items-start mb-6 relative">
          <div className="mr-4 mt-2 relative">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'border-2 border-blue-600' : 'hidden'}`}>
            {currentStep > 2 ? <FiCheck size={12} /> : <div className={`w-1.5 h-1.5 rounded-full ${currentStep === 2 ? 'bg-blue-600 animate-ping' : 'bg-gray-300'}`} />}
          </div>
            {currentStep > 2 && <div className="absolute left-2 top-5 h-full border-l-2 border-blue-600" style={{ height: 'calc(100% + 22px)' }}></div>}
          </div>
          <div className="w-full">
            <div className="flex items-center bg-gray-100 rounded-lg p-2 cursor-pointer" onClick={handleHairstylistClick}>
              <FiUser className="text-lg mr-2 text-gray-600" />
              <span className="text-xs">{selectedHairstylist ? selectedHairstylist.nameStylist : 'Chọn Thợ Cắt Tóc'}</span>
            </div>

            {showHairstylists && (
              <div className="mt-4">
                {hairstylists.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
                    {hairstylists.map((stylist) => (
                      <div
                        key={stylist.hairstylistId}
                        className={`flex flex-col items-center p-2 bg-white shadow-md rounded-lg cursor-pointer transition ${selectedHairstylist?.hairstylistId === stylist.hairstylistId ? 'border-2 border-blue-600' : ''}`}
                        onClick={() => selectHairstylist(stylist)}
                      >
                        <img src={stylist.mainImage} alt={stylist.nameStylist} className="w-20 h-20 rounded-full mb-2" />
                        <span className="text-center text-sm">{stylist.nameStylist}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-red-600 text-xs ml-3">Không có thợ cắt tóc nào</div>
                )}
              </div>
            )}
          </div>
        </div>

    {/* Service selection */}
    <div className="flex items-start mb-6 cursor-pointer relative">
  <div className="mr-4 mt-2 relative">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${selectedHairstylist && currentStep >= 3 ? 'border-2 border-blue-600' : 'hidden'}`}>
      {selectedHairstylist && selectedServices.length > 0 ? (
        <FiCheck size={12} />
      ) : (
        <div className={`w-1.5 h-1.5 rounded-full ${selectedHairstylist && currentStep === 3 ? 'bg-blue-600 animate-ping' : 'bg-gray-300'}`} />
      )}
    </div>
    {selectedHairstylist && selectedServices.length > 0 && (
      <div className="absolute left-2 top-5 h-full border-l-2 border-blue-600" style={{ height: 'calc(100% + 90px)' }}></div>
    )}
  </div>
  <div className="w-full">
    <div
      className="flex items-center justify-between p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
      onClick={handleOpenServiceModal} // Open modal on click
    >
      <div className="flex items-center">
        <FiScissors className="text-xl mr-2" />
        <span className="text-black-700 text-xs">
          {selectedServices.length === 0 ? "Chọn dịch vụ" : `Đã chọn ${selectedServices.length} dịch vụ`}
        </span>
      </div>
      {selectedServices.length > 0 && <FiCheck className="text-blue-600" size={20} />}
    </div>

    {/* Hiển thị danh sách dịch vụ đã chọn */}
    {selectedServices.length > 0 && (
      <div className="mt-2">
        {selectedServices.map((service, index) => (
          <span
            key={index}
            className="inline-block bg-white-300 text-xs px-2 py-1 border rounded-md mr-2 mb-2 mt-2"
          >
            {service.nameService}
          </span>
        ))}
        <div className="text-green-500 text-xs ml-1">
          Tổng số tiền anh cần thanh toán: {formatCurrencyVND(selectedServices.reduce((total, service) => total + service.price, 0))}
        </div>
      </div>
    )}
  </div>
</div>

{/* Show service modal */}
{isServiceModalOpen && (
  <SelectServiceModal
    onClose={handleCloseServiceModal}
    onSelect={handleServiceSelect}
    selectedServices={selectedServices}
  />
)}
        {/* Bước 5: Chọn Ngày Giờ */}
        <div className="flex items-start mb-6 relative">
  <div className="mr-4 mt-2 relative">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'border-2 border-blue-600' : 'hidden'}`}>
      {currentStep > 4 ? <FiCheck size={12} /> : <div className={`w-1.5 h-1.5 rounded-full ${currentStep === 4 ? 'bg-blue-600 animate-ping' : 'bg-gray-300'}`} />}
    </div>
    {currentStep > 4 && <div className="absolute left-2 top-5 h-full border-l-2 border-blue-600" style={{ height: 'calc(100% + 30px)' }}></div>}
  </div>

  <div className="w-full">
    <div onClick={toggleDateOptions} className="flex items-center bg-gray-100 rounded-lg p-2 cursor-pointer justify-between">
      <div className="flex items-center">
        <FiCalendar className="text-lg mr-2 text-gray-600" />
        <span className="text-xs text-black-700">{formatDateHeader(selectedDate).label}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div
          className={`px-2 py-0.5 rounded text-xs text-white font-semibold ${formatDateHeader(selectedDate).dayTypeColor}`}
        >
          {formatDateHeader(selectedDate).dayTypeLabel}
        </div>
        <FiChevronDown className="text-xs text-gray-500" style={{ fontSize: '15px' }} /> 
      </div>
    </div>

    {showDateOptions && (
      <div className="bg-white shadow rounded mt-1">
        {['today', 'tomorrow'].map((dateOption) => (
          <div
            key={dateOption}
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 text-xs"
            onClick={() => {
              setSelectedDate(dateOption);
              setShowDateOptions(false);
              setShowTimeSlots(true); // Show time slot grid when a new date is selected
            }}
          >
            <span>{formatDateHeader(dateOption).label}</span>
            <div
              className={`px-2 py-0.5 rounded text-xs text-white font-semibold ${formatDateHeader(dateOption).dayTypeColor}`}
            >
              {formatDateHeader(dateOption).dayTypeLabel}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Display the grid of available time slots if `showTimeSlots` is true */}
    {selectedServices.length > 0 && timeSlots.length > 0 && showTimeSlots && (
      <div className="grid grid-cols-6 gap-2 mt-4 overflow-y-auto" style={{ maxHeight: '150px' }}>
        {timeSlots.length > 0 ? (
          timeSlots.map((slot) => (
            <div
              key={slot.timeSlotId}
              onClick={() => handleTimeSlotSelect(slot)} // Click event to select time
              className={`p-2 text-xs text-center rounded-md border ${
                slot.isAvailable ? 'bg-white border-black cursor-pointer hover:text-blue-600' : 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ minWidth: '50px' }}
            >
              {slot.timeSlot}
            </div>
          ))
        ) : (
          <div className="col-span-6 text-center text-xs text-red-600">Không có khung giờ khả dụng</div>
        )}
      </div>
    )}

    {/* Display the selected time slot with date */}
    {selectedTimeSlot && (
      <div className="mt-2 p-2 bg-gray-100 rounded-md">
        <span className="text-xs text-gray-700">
          Đã chọn thời gian: {formatDateHeader(selectedDate).label} - {selectedTimeSlot.timeSlot}
        </span>
      </div>
    )}
  </div>
</div>
        {/* Bước 6: Thông tin khách hàng */}
        <div className="flex items-start mb-6 relative">
          <div className="mr-4 mt-2 relative">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${currentStep >= 5 ? 'border-2 border-blue-600' : 'hidden'}`}>
              {currentStep > 5 ? <FiCheck size={12} /> : <div className={`w-1.5 h-1.5 rounded-full ${currentStep === 5 ? 'bg-blue-600 animate-ping' : 'bg-gray-300'}`} />}
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-blue-600">Họ và Tên</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block text-sm font-medium mb-1 text-blue-600 mt-2">Số Điện Thoại</label>
            <input
              type="text"
              className={`w-full p-2 border rounded text-sm ${errors.phone ? 'border-red-600' : ''}`}
              placeholder="Số điện thoại"
              value={phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
            <label className="block text-sm font-medium mb-1 text-blue-600 mt-2">Email</label>
            <input
              type="email"
              className={`w-full p-2 border rounded text-sm ${errors.email ? 'border-red-600' : ''}`}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition duration-300 text-xs">
          GỬI ĐẶT LỊCH
        </button>
      </form>
    </div>
  );
};

export default AppointmentPage;
