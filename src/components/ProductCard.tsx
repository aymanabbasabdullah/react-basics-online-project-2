import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";
import CricleColor from "./ui/CricleColor";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { category, imageURL, title, description, price, colors } = product;
  /* --------- RENDER ----------- */
  const renderProductColor = colors.map((color) => (
    <CricleColor key={color} color={color} />
  ));

  return (
    <div className=" bg-white max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col shadow-sm hover:shadow-md transition  ">
      <Image imageURL={imageURL} alt={title} className="rounded-md mb-2" />
      <h3 className="overflow-hidden">{title} </h3>
      <p className="overflow-hidden">{txtSlicer(description)}</p>
      <div className="flex items-center flex-wrap  space-x-1">
        {renderProductColor}
      </div>

      <div className="flex justify-between items-center border-t pt-3 mt-auto">
        <span className="text-blue-600 font-bold">${price}</span>
        <div className="flex items-center space-x-2">
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="rounded-full  w-10 h-10 object-bottom"
          />
          <p>{category.name}</p>
        </div>
      </div>
      <div className="flex justify-between items-center space-x-2 mt-5 ">
        <Button
          className="bg-indigo-700 "
          onClick={() => alert("Edit button clicked")}
        >
          Edit
        </Button>
        <Button
          className="bg-red-700  "
          onClick={() => alert("Edit button clicked")}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
