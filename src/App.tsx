import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout'; 
import Hairstylist from './pages/admin/HairStylistPage'; 
import Salon from './pages/admin/SalonPage';
import Cities from './pages/admin/CitiesPage'; 
import Districts from './pages/admin/DistrictPage';
import Promotions from './pages/admin/PromotionPage';
import Service from './pages/admin/ServicesPage'; 
import ServiceCategorie from './pages/admin/ServiceCategoriePage'; 
import Customer from './pages/admin/CustomerPage';
import Appointment from './pages/admin/AppointmentPage'; 
import CustomerReview from './pages/admin/CustomerReviewPage';
import Partner from './pages/admin/PartnerPage';

// Import user components/layouts
import HomeLayout from './pages/user/HomeLayout'; 
import HomePage from './pages/user/HomePage';
import AppointmentPage from './pages/user/AppointmentPage'; 
import ServicePage from './pages/user/ServicePage';  
import ServiceDetailPage from './pages/user/ServiceDetailPage';
import SelectServicePage from './pages/user/SelectServicePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route cho admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="hairstylist" element={<Hairstylist />} />
            <Route path="salon" element={<Salon />} />
            <Route path="cities" element={<Cities />} />
            <Route path="district" element={<Districts />} />
            <Route path="promotion" element={<Promotions />} />
            <Route path="services" element={<Service />} />
            <Route path="servicecategory" element={<ServiceCategorie />} />
            <Route path="customer" element={<Customer />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="customerreview" element={<CustomerReview />} />
            <Route path="partner" element={<Partner />} />
          </Route>

          {/* Route cho user */}
          <Route path="/" element={<HomeLayout />}>
            {/* Trang chủ */}
            <Route index element={<HomePage />} />

            {/* Chi tiết dịch vụ */}
            <Route path="appointment" element={<AppointmentPage />} /> {/* Thêm route này */}
            <Route path="/service/:id" element={<ServicePage />} />
            <Route path="/service-detail/:id" element={<ServiceDetailPage />} />
            <Route path="/select-service" element={<SelectServicePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
