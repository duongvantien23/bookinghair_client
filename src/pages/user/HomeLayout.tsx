import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/user/layouts/Header';
import Footer from '../../components/user/layouts/Footer';

const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Thay đổi từ min-h-screen sang min-h-full */}
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow container mx-auto px-4 py-4"> 
        {/* Outlet để render các trang con */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
