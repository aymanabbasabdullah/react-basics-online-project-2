import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data";
import Button from "./components/ui/Button";

const App = () => {
  // ** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

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
        <div className="flex items-center  space-x-3 ">
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
      </Modal>
    </main>
  );
};

export default App;

/// ** SM => MD => LG => XL => 2XL => 3XL
/// ** 640 => 768 => 1024 => 1280 => 1536 => 1920
