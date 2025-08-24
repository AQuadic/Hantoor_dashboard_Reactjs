import { axios } from "@/lib/axios";
import { BodyType } from "./editStructure";

export const getStructureById = async (id: number): Promise<BodyType> => {
  const { data } = await axios.get<BodyType>(`/admin/vehicle/body/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};