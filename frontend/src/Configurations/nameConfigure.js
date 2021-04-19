export const truncateName = (nameOfProduct) => {
  if (nameOfProduct.length > 20) {
    let shortenName = nameOfProduct.substring(0, 50);
    shortenName = shortenName + "...";
    return shortenName;
  } else {
    return nameOfProduct;
  }
};
