import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className={`border-[1px] border-gray-300  shadow-sm  focus:border-indigo-500 
        focus:outline-none focus:ring-1  foucs:ring-indigo-500 rounded-lg
        p-3 text-md foucs:caret-indigo-500`}
      {...rest}
    />
  );
};

export default Input;
