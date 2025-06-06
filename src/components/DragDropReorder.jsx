import React, { useState } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

const DragDropReorder = ({ items, onReorder, renderItem }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    
    // Update order_position for all items
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order_position: index + 1
    }));
    
    onReorder(updatedItems);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const handleMoveDown = (index) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveItem(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`group border border-[#333333] rounded-lg p-4 bg-[#2a2a2a] transition-all ${
            draggedIndex === index 
              ? 'opacity-50 scale-95' 
              : 'hover:border-[#444444] hover:bg-[#333333]'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="p-1 text-[#666666] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Mover para cima"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <div className="cursor-move text-[#666666] hover:text-white">
                <GripVertical className="w-4 h-4" />
              </div>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === items.length - 1}
                className="p-1 text-[#666666] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Mover para baixo"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>

            {/* Item Content */}
            <div className="flex-1">
              {renderItem(item, index)}
            </div>

            {/* Order Number */}
            <div className="text-xs text-[#666666] bg-[#1a1a1a] px-2 py-1 rounded">
              #{index + 1}
            </div>
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="text-center py-8 text-[#666666]">
          <p>Nenhum item para reordenar</p>
        </div>
      )}
    </div>
  );
};

export default DragDropReorder;