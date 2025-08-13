import { axios } from "@/lib/axios";

export const editFeature = async (
  id: number,
  data: {
    description: { ar: string; en: string };
    is_active?: boolean;
  }
) => {
  const response = await axios.patch(
    `/admin/vehicle/feature-app/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
