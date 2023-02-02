import { DropdownProvider } from './dropdown-context';

type DropdownProps = {
  placeholder: string;
  children: JSX.Element;
};

const Dropdown = ({ children, ...props }: any) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
