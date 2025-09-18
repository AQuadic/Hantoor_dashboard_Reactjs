import { axios } from "@/lib/axios";

export async function deleteRole(id: string | number): Promise<void> {
  await axios.delete(`/admin/roles/${id}`);
}
