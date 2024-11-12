import React from 'react';
import { FiExternalLink } from 'react-icons/fi'; // Import icon

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-[#4A90E2] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Column 1 */}
            <div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Về chúng tôi <FiExternalLink className="ml-2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Cửa hàng Booking Hair <FiExternalLink className="ml-2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Tìm salon gần nhất <FiExternalLink className="ml-2" />
                  </a>
                </li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <ul className="space-y-2">
                <li>
                  <a href="tel:1900272703" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Hotline: 0399269728 <FiExternalLink className="ml-2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Liên hệ nhượng quyền <FiExternalLink className="ml-2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Liên hệ quảng cáo <FiExternalLink className="ml-2" />
                  </a>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <ul className="space-y-2">
                <li className='text-sm'>Giờ phục vụ: Thứ 2 đến Chủ Nhật, 8h30 - 20h30</li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Chính sách bảo mật <FiExternalLink className="ml-2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Điều kiện giao dịch chung <FiExternalLink className="ml-2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-300 transition duration-300 flex items-center text-sm">
                    Giấy phép giáo dục nghề nghiệp <FiExternalLink className="ml-2" />
                  </a>
                </li>
              </ul>
            </div>
            {/* Column 4 - Payment Options */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Thanh Toán</h4>
              <div className="flex space-x-4">
                <img src="../Img/visa-47080.png" alt="Visa" className="w-12 h-auto" />
                <img src="../Img/mc-84781.png" alt="MasterCard" className="w-12 h-auto" />
                <img src="../Img/jcb-77912.png" alt="JCB" className="w-12 h-auto" />
              </div>
            </div>
            {/* Column 5 - Social Media Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Mạng Xã Hội</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Facebook */}
                <div className="flex items-center space-x-4">
                  <img src="../Img/fb-87790.png" alt="Facebook" className="w-12 h-12 rounded-full" />
                  <span className="text-sm">178K follow</span>
                </div>
                {/* Zalo */}
                <div className="flex items-center space-x-4">
                  <img src="../Img/zl-79951.png" alt="Zalo" className="w-12 h-12 rounded-full" />
                  <span className="text-sm">140K follow</span>
                </div>
                {/* TikTok */}
                <div className="flex items-center space-x-4">
                  <img src="../Img/tt-85870.png" alt="TikTok" className="w-12 h-12 rounded-full" />
                  <span className="text-sm">650K follow</span>
                </div>
                {/* Instagram */}
                <div className="flex items-center space-x-4">
                  <img src="../Img/it-26330.png" alt="Instagram" className="w-12 h-12 rounded-full" />
                  <span className="text-sm">140K follow</span>
                </div>
              </div>
              {/* Additional Logos */}
              <div className="mt-4 flex space-x-4">
                {/* Đã Thông Báo Bộ Công Thương */}
                <img src="../Img/footer_congthuongicon.f3d3b02c.png" alt="Đã Thông Báo Bộ Công Thương" className="w-16 h-auto" />
                {/* DMCA Protected */}
                <img src="../Img/footer_dmca.png" alt="DMCA Protected" className="w-16 h-auto" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-[#fff] text-black py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Công Ty Cổ Phần Booking Hair / Địa chỉ: Bần Yên Nhân, Mỹ Hào, Hưng Yên.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
