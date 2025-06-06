// src/components/lesson/ResourcesList.jsx
import React from 'react';
import ResourceItem from '../ui/ResourceItem';

const ResourcesList = ({ resources, title = "Resources" }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;