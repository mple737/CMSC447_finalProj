// pages/settings.js
import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleNotifications = () => setNotifications((prev) => !prev);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow">
          <span>Theme</span>
          <button onClick={toggleTheme} className="p-2 bg-gray-300 rounded">
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow">
          <span>Notifications</span>
          <button onClick={toggleNotifications} className="p-2 bg-gray-300 rounded">
            {notifications ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

