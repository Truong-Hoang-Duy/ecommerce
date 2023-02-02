import React from 'react';
import { useDropdown } from './dropdown-context';

const DropdownList = ({ children }: any) => {
  const { show }: any = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-slate-50 shadow-sm">{children}</div>
      )}
    </>
  );
};

export default DropdownList;
