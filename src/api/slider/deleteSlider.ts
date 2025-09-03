import { axios } from "@/lib/axios";

export const deleteSlider = async (id: number) => {
  const response = await axios.delete(`/admin/setting/sliders/${id}`);
  return response.data;
};
