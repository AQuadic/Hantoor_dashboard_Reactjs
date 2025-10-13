import { axios } from "@/lib/axios";

export const editFeature = async (
  id: number,
  data: {
    description: { ar: string; en: string };
    is_active?: boolean | number;
    image?: File | null;
    /** If true, request will tell server to remove existing image */
    remove_image?: boolean;
  }
) => {
  // Build FormData and use POST with _method=PUT so image (file) can be sent
  const form = new FormData();

  form.append("_method", "PUT");

  form.append("description[ar]", data.description.ar ?? "");
  form.append("description[en]", data.description.en ?? "");

  if (typeof data.is_active === "boolean") {
    form.append("is_active", data.is_active ? "1" : "0");
  } else if (typeof data.is_active === "number") {
    form.append("is_active", String(data.is_active));
  }

  if (data.image instanceof File) {
    form.append("image", data.image);
  } else if (data.remove_image) {
    // signal backend to remove existing image; key name depends on backend
    form.append("remove_image", "1");
  }

  const response = await axios.post(`/admin/vehicle/feature-app/${id}`, form, {
    headers: {
      // Let axios set the proper multipart boundary header for FormData
      Accept: "application/json",
    },
  });

  return response.data;
};
