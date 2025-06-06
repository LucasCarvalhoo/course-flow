// src/components/layout/Sidebar.jsx
import React from 'react';
import { LogOut, User } from 'lucide-react';
import Logo from '../common/Logo';
import SearchBar from '../ui/SearchBar';
import ModuleItem from '../ui/ModuleItem';
import LinkItem from '../ui/LinkItem';

const Sidebar = () => {
  const modules = [
    { id: 1, name: 'Introduction', icon: '✓', active: true },
    { id: 2, name: 'Foundation', icon: '⚡', active: false },
    { id: 3, name: 'Creation', icon: '🎨', active: false },
    { id: 4, name: 'Strategies', icon: '📊', active: false }
  ];

  const links = [
    { id: 1, name: 'Community', icon: '🌐' },
    { id: 2, name: 'Coaching', icon: '💬' },
    { id: 3, name: 'Mentors', icon: '👥' }
  ];

  const accountItems = [
    { id: 1, name: 'Profile', icon: User },
    { id: 2, name: 'Logout', icon: LogOut }
  ];

  return (
    <div className="w-64 bg-[#1c1c1c] border-r border-gray-700/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700/50">
        <Logo />
      </div>

      {/* Modules */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-3">MODULAR</h3>
          <div className="space-y-1">
            {modules.map((module) => (
              <ModuleItem key={module.id} module={module} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-3">LINKS</h3>
          <div className="space-y-1">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-3">ACCOUNT</h3>
          <div className="space-y-1">
            {accountItems.map((item) => (
              <LinkItem key={item.id} link={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-t border-gray-700/50">
        <SearchBar />
      </div>
    </div>
  );
};

export default Sidebar;