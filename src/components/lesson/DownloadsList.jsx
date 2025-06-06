// src/components/lesson/DownloadsList.jsx
import React from 'react';
import DownloadItem from '../ui/DownloadItem';

const DownloadsList = ({ downloads, title = "Downloads" }) => {
  if (!downloads || downloads.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {downloads.map((download) => (
          <DownloadItem key={download.id} download={download} />
        ))}
      </div>
    </div>
  );
};

export default DownloadsList;