export const cleanProductData = (product, imageURLs) => ({
  ...product,

  images: [...product?.images,...imageURLs],
  sku: product.sku?.trim() === "" ? null : product.sku,
  size: product.size?.trim() === "" ? null : product.size,
  brand: product.brand?.trim() === "" ? null : product.brand,
  warranty: product.warranty?.trim() === "" ? null : product.warranty,
});
