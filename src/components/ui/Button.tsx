interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
  width?: "w-full" | "w-fit" | "w-auto" | "w-1/2";
}

const Button = ({ className, children, width = "w-full", ...rest }: IProps) => {
  console.log({ rest });
  return (
    <button
      className={`${className}  p-2 ${width} rounded-lg text-white hover:opacity-90 transition`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
