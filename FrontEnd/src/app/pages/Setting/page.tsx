// pages/Settings.js
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleNotifications = () => setNotifications((prev) => !prev);
  const toggleSound = () => setSound((prev) => !prev);
  const toggleAutoUpdates = () => setAutoUpdates((prev) => !prev);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex flex-1 p-8 space-x-8">
          <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg overflow-y-auto`}>
            <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Settings</h1>
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow`}>
                <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Theme</span>
                <button onClick={toggleTheme} className={`p-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded`}>
                  {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
              </div>
              
              {/* Notifications Toggle */}
              <div className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow`}>
                <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Notifications</span>
                <button onClick={toggleNotifications} className={`p-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded`}>
                  {notifications ? 'Disable' : 'Enable'}
                </button>
              </div>

              {/* Sound Toggle */}
              <div className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow`}>
                <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Sound</span>
                <button onClick={toggleSound} className={`p-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded`}>
                  {sound ? 'Disable' : 'Enable'}
                </button>
              </div>

              {/* Auto-Updates Toggle */}
              <div className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow`}>
                <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Auto-Updates</span>
                <button onClick={toggleAutoUpdates} className={`p-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded`}>
                  {autoUpdates ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
