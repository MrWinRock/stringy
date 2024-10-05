import api from "./api";

export const uploadService = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};
