import React from 'react';
import { BellOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const Header: React.FC = () => {
  return (
    <div className="bg-blue-600 flex justify-between items-center p-4 text-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src="path/to/logo.png" alt="Logo" className="h-8" />
      </div>

      {/* Actions Section */}
      <div className="flex items-center space-x-6">
        {/* Fullscreen Icon */}
        <FullscreenOutlined className="text-xl cursor-pointer" />

        {/* Bell Notification Icon */}
        <BellOutlined className="text-xl cursor-pointer" />

        {/* Avatar and Username */}
        <div className="flex items-center cursor-pointer">
          <Avatar size="large" style={{ backgroundColor: '#1890ff' }} /> {/* Avatar */}
          <span className="ml-2">John Doe</span> {/* Username */}
        </div>
      </div>
    </div>
  );
};

export default Header;
