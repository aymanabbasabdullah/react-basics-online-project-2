import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";

const App = () => {
  /* --------- STATE ----------- */
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  /* --------- HANDLERS ----------- */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    console.log(event.target.value);
  };
  console.log(product);
  /* --------- RENDER ----------- */
  // ** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input, index) => {
    return (
      <div className="flex flex-col" key={input.id}>
        <label
          htmlFor={input.name}
          className="mb-[2px] font-medium text-gray-700 "
        >
          {input.label}
        </label>
        <Input
          name={input.name}
          type="text"
          id={input.id}
          autoFocus={index === 0}
          // Line Below In Wrong Fix IT
          value={product[input.name]}
          onChange={onChangeHandler}
        ></Input>
      </div>
    );
  });

  return (
    <main className=" container px-4 ">
      <Button
        className="bg-indigo-700 my-5 "
        width="w-full"
        onClick={openModal}
      >
        Build Now
      </Button>
      <div className=" m-5 gap-2 md:gap-4 p-2 rounded-md  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3">
          {renderFormInputList}

          <div className="flex items-center  space-x-3 mt-5 ">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 "
              onClick={closeModal}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-300 hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;

/// ** SM => MD => LG => XL => 2XL => 3XL
/// ** 640 => 768 => 1024 => 1280 => 1536 => 1920
