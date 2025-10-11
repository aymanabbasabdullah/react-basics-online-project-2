import ProductCard from "./components/ProductCard";
import { productList } from "./data";

const App = () => {
  // ** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className=" container px-4">
      <div className="m-5 gap-2 md:gap-4 p-2 rounded-md  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {renderProductList}
      </div>
    </main>
  );
};

export default App;

/// ** SM => MD => LG => XL => 2XL => 3XL
/// ** 640 => 768 => 1024 => 1280 => 1536 => 1920
