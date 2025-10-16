interface IProps {
  imageURL: string;
  alt: string;
  className: string;
}

const Image = ({ imageURL, alt, className }: IProps) => {
  if (!imageURL) return null; // لا يرسم الصورة أصلًا إذا مافيه src
  return <img src={imageURL} alt={alt} className={className} />;
};

export default Image;
