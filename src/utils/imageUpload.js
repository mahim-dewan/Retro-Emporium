export const imageUploader = async (images) => {
  const uploadImages = images.map((file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "retro-emporium");
    data.append("folder", "retro/products");

    return fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API, {
      method: "POST",
      body: data,
    }).then((res) => res.json());
  });

  const results = await Promise.all(uploadImages);

  return results;
};
