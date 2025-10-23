import { axios } from "@/lib/axios";

export interface VehicleClass {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  vehicle_type_id: number;
  is_active: boolean;
}

export interface GetVehicleClassesParams {
  search?: string;
  vehicle_type_id?: number;
  pagination?: boolean;
  page?: number;
  per_page?: number;
}

export interface GetVehicleClassesPaginated {
  current_page: number;
  data: VehicleClass[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: unknown[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const getVehicleClasses = async (
  params?: GetVehicleClassesParams
): Promise<GetVehicleClassesPaginated | VehicleClass[]> => {
  try {
    // If pagination is explicitly false, fetch all data
    if (params?.pagination === false) {
      let allClasses: VehicleClass[] = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get<
          GetVehicleClassesPaginated | VehicleClass[]
        >("/admin/vehicle/class", {
          params: {
            ...params,
            pagination: undefined, // Remove pagination param from request
            page: currentPage,
            per_page: 100,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // Check if response is array or paginated
        if (Array.isArray(response.data)) {
          allClasses = [...allClasses, ...response.data];
          hasMore = false; // API returned array, no more pages
        } else {
          const paginatedData = response.data;
          allClasses = [...allClasses, ...paginatedData.data];

          // Check if there are more pages
          if (
            !paginatedData.next_page_url ||
            currentPage >= paginatedData.last_page
          ) {
            hasMore = false;
          } else {
            currentPage++;
          }
        }
      }

      return allClasses;
    }

    // Paginated response
    const response = await axios.get<
      GetVehicleClassesPaginated | VehicleClass[]
    >("/admin/vehicle/class", {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching vehicle classes:", error);
    throw error;
  }
};
