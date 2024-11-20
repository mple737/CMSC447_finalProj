// pages/Settings.js
import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar';
import Header from '../../Component/header';
import { useTheme } from 'next-themes'

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);

  const { resolvedTheme, setTheme } = useTheme()

  console.log(resolvedTheme)

  return (
    <div className={`flex h-screen dark:bg-gray-900 bg-gray-100`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        {/* Main Content Area */}
        <div className="flex flex-1 p-8 space-x-8">
          <div className={`flex-1 dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-y-auto`}>
            <h1 className={`text-3xl font-bold mb-6 dark:text-gray-100 text-gray-800`}>Settings</h1>
            <div className="space-y-4">
              
              {/* Theme Toggle */}
              <div className={`flex items-center justify-between p-4 dark:bg-gray-700 bg-gray-200 rounded shadow`}>
                <span className={`dark:text-gray-100 text-gray-800`}>Theme</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" onChange={(e) => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition duration-200 dark:bg-green-700 bg-gray-500`}></div>
                  <span className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-200 dark:bg-white dark:translate-x-5 bg-white`}></span>
                </label>
              </div>

              {/* Notifications Toggle */}
              <div className={`flex items-center justify-between p-4 dark:bg-gray-700 bg-gray-200 rounded shadow`}>
                <span className={'dark:text-gray-100 text-gray-800'}>Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition duration-200 ${notifications ? ('dark:bg-green-700 bg-green-500') : ('dark:bg-gray-600 bg-gray-500')}`}></div>
                  <span className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-200 ${notifications ? 'bg-white translate-x-5' : 'bg-white'}`}></span>
                </label>
              </div>

              {/* Sound Toggle */}
              <div className={`flex items-center justify-between p-4 dark:bg-gray-700 bg-gray-200 rounded shadow`}>
                <span className={'dark:text-gray-100 text-gray-800'}>Sound</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={sound} onChange={() => setSound(!sound)} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition duration-200 ${sound ? 'dark:bg-green-700 bg-green-500' : 'dark:bg-gray-600 bg-gray-500'}`}></div>
                  <span className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-200 ${sound ? 'bg-white translate-x-5' : 'bg-white'}`}></span>
                </label>
              </div>

              {/* Auto-Updates Toggle */}
              <div className={`flex items-center justify-between p-4 dark:bg-gray-700 bg-gray-200 rounded shadow`}>
                <span className={'dark:text-gray-100 text-gray-800'}>Auto-Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={autoUpdates} onChange={() => setAutoUpdates(!autoUpdates)} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition duration-200 ${autoUpdates ? 'dark:bg-green-700 bg-green-500' : 'dark:bg-gray-600 bg-gray-500'}`}></div>
                  <span className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-200 ${autoUpdates ? 'bg-white translate-x-5' : 'bg-white'}`}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
