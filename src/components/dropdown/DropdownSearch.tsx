import React from 'react';
import { useDropdown } from './dropdown-context';
const DropdownSearch = ({ placeholder, ...props }: any) => {
  const { onChange } = useDropdown();
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="p-4 outline-none w-full border border-gray-200 rounded"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default DropdownSearch;
