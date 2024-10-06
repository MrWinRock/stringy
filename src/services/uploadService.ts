import api from "./api";

export const uploadService = async (
  imageFile: File,
  userId: number
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("userId", userId.toString());

  try {
    const response = await api.post("/upload/profile-picture", formData, {
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

export const getProfilePicture = async (userId: number): Promise<string> => {
  try {
    const response = await api.get(`/upload/${userId}/profile-picture`);

    return response.data.profile_picture_url;
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    throw error;
  }
};
