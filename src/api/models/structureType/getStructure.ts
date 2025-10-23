import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface GetVehicleBodiesParams {
  search?: string;
  pagination?: boolean;
}

export interface VehicleBody {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  is_active: boolean | number;
  created_at: string;
  updated_at: string;
}

export interface VehicleBodiesPaginated {
  current_page: number;
  data: VehicleBody[];
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

export const getVehicleBodies = async (
  params?: GetVehicleBodiesParams
): Promise<VehicleBodiesPaginated | VehicleBody[]> => {
  // If pagination is explicitly false, fetch all data
  if (params?.pagination === false) {
    let allBodies: VehicleBody[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get<VehicleBodiesPaginated>(
        "/admin/vehicle/body",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            ...params,
            pagination: undefined, // Remove pagination param from request
            page: currentPage,
            per_page: 100,
          },
        }
      );

      allBodies = [...allBodies, ...response.data.data];

      // Check if there are more pages
      if (
        !response.data.next_page_url ||
        currentPage >= response.data.last_page
      ) {
        hasMore = false;
      } else {
        currentPage++;
      }
    }

    return allBodies;
  }

  // Paginated response
  const response = await axios.get<VehicleBodiesPaginated>(
    "/admin/vehicle/body",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    }
  );
  return response.data;
};

export const useVehicleBodies = (params?: GetVehicleBodiesParams) => {
  return useQuery<VehicleBodiesPaginated | VehicleBody[]>({
    queryKey: ["vehicleBodies", params],
    queryFn: () => getVehicleBodies(params),
  });
};
