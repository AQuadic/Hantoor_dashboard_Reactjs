import { axios } from "@/lib/axios";
import type { Role } from "./getRoles";

export async function getRole(id: string | number): Promise<Role> {
  const response = await axios.get(`/api/admin/roles/${id}`);
  return response.data as Role;
}
