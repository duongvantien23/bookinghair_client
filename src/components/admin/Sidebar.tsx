import React from 'react';
import { HomeOutlined, TableOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } h-full bg-white text-black flex flex-col transition-all duration-300 border-r border-gray-200`}
    >
      {/* Sidebar Header */}
      <div className="p-4 bg-blue-600 flex items-center justify-center">
        <img
          src="path/to/logo.png"
          alt="Logo"
          className={`${collapsed ? 'h-10' : 'h-16'} transition-all duration-300`}
        />
      </div>

      {/* User Info */}
      <div className="flex items-center justify-center flex-col p-4 bg-blue-600">
        <Avatar src="path/to/avatar.jpg" />
        {!collapsed && <span className="mt-2 text-white">John Doe</span>}
      </div>

      {/* Navigation Links */}
      <div className="flex-grow">
        <ul className="space-y-2 mt-4">
          <li className="flex items-center p-4 hover:bg-blue-500 hover:text-white transition-all rounded-lg cursor-pointer">
            <HomeOutlined />
            {!collapsed && <span className="ml-4">Dashboard</span>}
          </li>
          <li className="flex items-center p-4 hover:bg-blue-500 hover:text-white transition-all rounded-lg cursor-pointer">
            <TableOutlined />
            {!collapsed && <span className="ml-4">Tables</span>}
          </li>
          <li className="flex items-center p-4 hover:bg-blue-500 hover:text-white transition-all rounded-lg cursor-pointer">
            <TableOutlined />
            {!collapsed && <span className="ml-4">Tables</span>}
          </li>
          <li className="flex items-center p-4 hover:bg-blue-500 hover:text-white transition-all rounded-lg cursor-pointer">
            <TableOutlined />
            {!collapsed && <span className="ml-4">Tables</span>}
          </li>
          <li className="flex items-center p-4 hover:bg-blue-500 hover:text-white transition-all rounded-lg cursor-pointer">
            <TableOutlined />
            {!collapsed && <span className="ml-4">Tables</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
