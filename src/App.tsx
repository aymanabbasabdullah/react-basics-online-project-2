import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

const App = () => {
  // ** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input, index) => {
    return (
      <div className="flex flex-col">
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
        ></Input>
      </div>
    );
  });

  /* --------- STATE ----------- */
  const [isOpen, setIsOpen] = useState(false);

  /* --------- HANDLERS ----------- */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  /* --------- RENDER ----------- */
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
