import { axios } from "@/lib/axios";

export async function deleteFinancing(id: string | number): Promise<void> {
  await axios.delete(`/admin/request-financing/${id}`);
}
