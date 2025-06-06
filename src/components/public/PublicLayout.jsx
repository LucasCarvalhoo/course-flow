import React from 'react';
import PublicHeader from './PublicHeader';
import PublicSidebar from './PublicSidebar';

const PublicLayout = ({ children, showSidebar = true }) => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <PublicHeader />
      <div className="flex">
        {showSidebar && <PublicSidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-0' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;