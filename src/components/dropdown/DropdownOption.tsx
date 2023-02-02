import { useDropdown } from './dropdown-context';

const DropdownOption = (props: any) => {
  const { onClick } = props;
  const { setShow }: any = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default DropdownOption;
