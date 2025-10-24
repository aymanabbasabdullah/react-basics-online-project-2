import type { IProduct } from "../interfaces";
import { numberWithCommas, txtSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";
import CricleColor from "./ui/CricleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  onConfirmModalOpen: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  onConfirmModalOpen: onConfirmModal,
}: IProps) => {
  const { category, imageURL, title, description, price, colors } = product;
  /* --------- RENDER ----------- */

  const renderProductColor = colors.map((color) => (
    <CricleColor key={color} color={color} />
  ));
  /* --------- HANDERLAR ----------- */
  const onEdit = () => {
    setProductToEdit(product); // print Object product
    openEditModal();
    setProductToEditIdx(idx); //update
  };
  const onRemove = () => {
    setProductToEdit(product); // print Object product
    onConfirmModal();
  };
  return (
    <div className=" bg-white max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col shadow-sm hover:shadow-md transition  ">
      <Image imageURL={imageURL} alt={title} className="rounded-md mb-2" />
      <h3 className="overflow-hidden">{title} </h3>
      <p className="overflow-hidden text-gray-500 my-2">
        {txtSlicer(description)}
      </p>
      <div className="flex items-center flex-wrap space-x-1 mb-1">
        {!colors.length ? "No colors available" : renderProductColor}
      </div>

      <div className="flex justify-between items-center border-t pt-3 mt-auto">
        <span className="text-blue-600 font-bold">
          ${numberWithCommas(price)}
        </span>
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
        <Button className="bg-indigo-700 " onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-700  " onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
