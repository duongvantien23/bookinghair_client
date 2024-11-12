import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import {
  BellOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Settings</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>My Messages</span>
      </Menu.Item>
      <Menu.Item key="4">
        <span>Lock Screen</span>
      </Menu.Item>
      <Menu.Item key="5">
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={isSidebarCollapsed} />

      <div className="flex flex-col flex-grow w-full">
        <div className="flex justify-between items-center bg-blue-500 text-white p-4 w-full">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-white">
              <MenuOutlined />
            </button>
            <span className="ml-4 text-xl">BOOKING HAIR</span>
          </div>

          <div className="flex items-center">
            <button onClick={toggleFullscreen} className="text-white mr-4">
              {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </button>
            <BellOutlined className="text-xl mr-4" />
            
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight" arrow>
              <div className="flex items-center cursor-pointer">
                <Avatar src="path/to/avatar.jpg" />
                <span className="ml-2">John Doe</span>
                <DownOutlined className="ml-2 text-xl" />
              </div>
            </Dropdown>
          </div>
        </div>

        <div
          className="bg-blue-400 text-white p-4 text-center w-full"
          style={{
            backgroundImage: "url('../Img/anhbackground.jpg')",
            backgroundSize: 'cover', 
            backgroundPosition: 'right',
          }}
        >
          <span>Dashboard</span><span>-</span><span>Tables</span>
        </div>

        <div className="flex-grow p-6 bg-gray-100 overflow-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
