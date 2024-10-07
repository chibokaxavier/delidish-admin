const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME!;
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;

const uploadImageToCloudinary = async (file: File) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("cloud_name", cloud_name);
  uploadData.append("upload_preset", upload_preset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
    {
      method: "POST",
      body: uploadData,
    }
  );

  // Handle response
  if (!response.ok) {
    throw new Error(`Cloudinary upload failed: ${response.statusText}`);
  }

  const data = response.json();
  return data;
};

export default uploadImageToCloudinary;
