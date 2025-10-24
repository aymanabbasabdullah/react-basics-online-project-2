import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CricleColor from "./components/ui/CricleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import type { TProductNames } from "./types";

const defaultProductObject = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
};
const App = () => {
  /* --------- STATE ----------- */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0); //update
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [tempColros, setTempColor] = useState<string[]>([]);
  const [colorError, setColorError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[0]
  );

  /* --------- HANDLERS ----------- */

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
    // console.log(event.target.value);
  };
  const onChangeEditHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
    // console.log(event.target.value);
  };
  // console.log(product);

  const onCancel = () => {
    console.log("Cancel");
    setProduct(defaultProductObject);

    closeModal();
    closeEditModal();
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({ title, description, imageURL, price });
    // ** Check if any property has a value of "" && Check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    const hasNoColors = tempColros.length === 0;
    setColorError(hasNoColors ? "Please select at least one color!" : "");
    if (!hasErrorMsg || hasNoColors) {
      setErrors(errors);
      openModal();
      return;
    }

    // Add New Product
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColros,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObject);
    setTempColor([]);
    closeModal();
    // console.log(hasErrorMsg);
    console.log("Send This Product to server");
  };

  const submitEditHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({ title, description, imageURL, price });
    // ** Check if any property has a value of "" && Check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      openEditModal();
      return;
    }

    //Update Product
    // setProducts((prev) =>
    //   prev.map((product) =>
    //     product.id === productToEdit.id ? productToEdit : product
    //   )
    // );

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColros.concat(productToEdit.colors),
    };

    setProducts(updatedProducts);

    console.log(updatedProducts);

    setProductToEdit(defaultProductObject);
    setTempColor([]);
    closeEditModal();
    console.log("Updated Product:", productToEdit);
  };

  /* --------- RENDER ----------- */
  // ** Render
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
    />
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
        />

        <ErrorMessage msg={errors[input.name]} />
      </div>
    );
  });

  const renderProductColor = colors.map((color) => (
    <CricleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColros.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);

        //clean and “best-practice” 2 way
        // setTempColor((prev) => {
        //   const exits = tempColros.includes(color);
        //   const update = exits
        //     ? prev.filter((item) => item !== color)
        //     : [...prev, color];

        //   if (update.length > 0) setColorError("");
        //   return update;
        // });
      }}
    />
  ));
  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductNames //"title" | "description" | "imageURL" | "price";
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] font-medium text-gray-700 ">
          {label}
        </label>
        <Input
          name={name}
          type="text"
          id={id}
          // autoFocus={index === 0}
          // Line Below In Wrong Fix IT
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />

        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

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
      {/** Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap  space-x-1">
            {renderProductColor}

            {colorError && <ErrorMessage msg={colorError} />}
          </div>

          <div className="flex items-center flex-wrap  space-x-1">
            {tempColros.map((color) => (
              <span
                key={color}
                className="p-1 rounded-md text-xs text-white mb-1 mr-1"
                style={{ background: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center  space-x-3 mt-5 ">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 "
              onClick={closeModal}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-300 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/** Edit Product Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}

          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex items-center flex-wrap  space-x-1">
            {renderProductColor}

            {colorError && <ErrorMessage msg={colorError} />}
          </div>

          <div className="flex items-center flex-wrap  space-x-1">
            {tempColros.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 rounded-md text-xs text-white mb-1 mr-1"
                style={{ background: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center  space-x-3 mt-5 ">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 "
              type="submit"
            >
              EDIT
            </Button>
            <Button
              className="bg-gray-300 hover:bg-gray-400"
              onClick={onCancel}
              type="submit"
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

// Tailwend css
/// ** SM => MD => LG => XL => 2XL => 3XL
/// ** 640 => 768 => 1024 => 1280 => 1536 => 1920
