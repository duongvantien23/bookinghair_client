import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-6"> 
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="./Img/logo.png"
            alt="Logo"
            className="h-10" 
          />
          <span className="font-bold text-2xl text-primary">BOOKING HAIR</span> 
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-black-600 text-sm"> 
          <a href="/" className="hover:text-hover-blue transition duration-300">Trang chủ</a>
          <a href="/about" className="hover:text-hover-blue transition duration-300">Về Booking Hair</a>
          <a href="/shop" className="hover:text-hover-blue transition duration-300">Sản Phẩm</a>
          <a href="/find" className="hover:text-hover-blue transition duration-300">Hệ Thống Salon</a>
          <a href="/learn" className="hover:text-hover-blue transition duration-300">Dịch Vụ</a>
          <a href="/franchise" className="hover:text-hover-blue transition duration-300">Tin Tức</a>
          <a href="/partners" className="hover:text-hover-blue transition duration-300">Đối tác</a>
        </nav>

        {/* Nút Đăng nhập nhỏ */}
        <div className="hidden md:flex items-center">
          <a
            href="/login"
            className="px-3 py-2 text-sm border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
            style={{
              padding: "4px 12px", 
              fontSize: "14px" 
            }}
          >
            Đăng nhập
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <nav className="flex flex-col space-y-2 text-gray-600">
            <a href="/" className="hover:text-hover-blue transition duration-300">Trang chủ</a>
            <a href="/about" className="hover:text-hover-blue transition duration-300">Về Booking Hair</a>
            <a href="/shop" className="hover:text-hover-blue transition duration-300">Sản Phẩm</a>
            <a href="/find" className="hover:text-hover-blue transition duration-300">Hệ Thống Salon</a>
            <a href="/learn" className="hover:text-hover-blue transition duration-300">Dịch Vụ</a>
            <a href="/franchise" className="hover:text-hover-blue transition duration-300">Tin Tức</a>
            <a href="/partners" className="hover:text-hover-blue transition duration-300">Đối tác</a>
            <a
              href="/login"
              className="px-2 py-1 text-sm border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
            >
              Đăng nhập
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
