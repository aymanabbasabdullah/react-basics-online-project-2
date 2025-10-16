import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CricleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={` block w-5 h-5   rounded-full   cursor-pointer mb-1 hover:opacity-70  transition-all`}
      style={{ background: color }}
      {...rest}
    />
  );
};

export default CricleColor;
