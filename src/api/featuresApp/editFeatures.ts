import { axios } from "@/lib/axios";

export const editFeature = async (
  id: number,
  data: {
    description: { ar: string; en: string };
    is_active?: boolean | number;
  }
) => {
  // Normalize is_active to 0/1 if boolean provided
  const payload: Record<string, unknown> = { ...data } as Record<
    string,
    unknown
  >;
  if (typeof data.is_active === "boolean") {
    payload.is_active = data.is_active ? 1 : 0;
  } else if (typeof data.is_active === "number") {
    payload.is_active = data.is_active;
  }

  const response = await axios.patch(
    `/admin/vehicle/feature-app/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
