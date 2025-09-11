export const calculateDiscountPersent = (product) => {
  if (!product?.regularPrice || !product?.discountPrice) return 0;

  const discount =
    ((product.regularPrice - product.discountPrice) / product.regularPrice) *
    100;
  return Math.round(discount);
};
