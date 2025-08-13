import { axios } from "@/lib/axios";

export async function fetchBrandById(id: number) {
  const response = await axios.get(`/admin/brands/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}

export async function updateBrand({
  id,
  name,
  image,
  is_active,
}: {
  id: number;
  name?: { ar?: string; en?: string };
  image?: File | null;
  is_active?: boolean;
}) {
  const formData = new FormData();
  if (name) {
    if (name.ar) formData.append("name[ar]", name.ar);
    if (name.en) formData.append("name[en]", name.en);
  }
  if (typeof is_active === "boolean")
    formData.append("is_active", is_active ? "1" : "0");
  if (image) formData.append("image", image);

  const response = await axios.put(`/admin/brands/${id}`, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
