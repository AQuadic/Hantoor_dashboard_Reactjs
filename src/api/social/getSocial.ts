import { axios } from "@/lib/axios";

export const getSocialSettings = async () => {
  const response = await axios.get("/admin/setting/socials");
  return response.data;
};
