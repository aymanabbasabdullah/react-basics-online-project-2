// ** productObj === errorsObj    (Title , Description , Image , Price)

/**
 * 
 * @param product 
 * @returns 
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  // ** Return an object
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 cahracters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 80 cahracters";
  }
  if (!product.imageURL.trim() || !validURL) {
    errors.imageURL = "Vaild image URL is required!";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Vaild price is required!";
  }
  return errors;
};
