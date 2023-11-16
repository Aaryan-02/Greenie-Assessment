import React, { useState } from 'react';

const Menu = ({ column, children, sortOrder, handleSortOption }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSortClick = (option) => {
    handleSortOption(option);
    handleMenuToggle();
  };

  return (
    <th className="py-4 px-3 relative">
      <div className="flex items-center cursor-pointer">
        <span className="mr-1">{children}</span>
        <div className="inline-block">
          <svg className="h-6 w-6 text-white cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" onClick={handleMenuToggle}
          ><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-35 bg-white border rounded-md shadow-lg">
              <div className="p-1 cursor-pointer hover:bg-gray-200 text-black text-lg" onClick={() => handleSortClick('asc')}>
                Sort by Asc
              </div>
              <div className="p-1 cursor-pointer hover:bg-gray-200 text-black text-lg" onClick={() => handleSortClick('desc')}>
                Sort by Desc
              </div>
            </div>
          )}
        </div>
        {sortOrder.column === column && sortOrder.order && (
          <div>{sortOrder.order === 'asc' ? '🠕' : '🠗'}</div>
        )}
      </div>
    </th>
  );
};

export default Menu;
