import api from "./api";

export const getBio = async (userId: number) => {
  try {
    const response = await api.get(`/user/bio`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching bio");
  }
};

export const updateBio = async (userId: number, bio: string) => {
  try {
    const response = await api.put(`/user/bio`, { userId, bio });
    return response.data;
  } catch (error) {
    throw new Error("Error updating bio");
  }
};
