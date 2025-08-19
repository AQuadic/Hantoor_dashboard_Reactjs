import { axios } from "@/lib/axios";

export async function deleteBrandImage(id: number) {
  const response = await axios.delete(`/admin/brands/${id}/image`, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.data;
}
