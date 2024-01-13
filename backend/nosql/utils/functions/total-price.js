const totalPrice = (item) => {
  return item.products.reduce(
    (total, item) =>
      total + Number(item?.product?.price?.substring(1)) * item?.quantity,
    0
  );
};

module.exports = totalPrice;
