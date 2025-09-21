import { axios } from "@/lib/axios";
import { GetCurrentPermissionsResponse } from "@/types/PermissionTypes";

/**
 * Fetches the current user's permissions from the backend
 * @returns Promise<GetCurrentPermissionsResponse> - User's permissions as array of strings
 */
export const getCurrentPermissions =
  async (): Promise<GetCurrentPermissionsResponse> => {
    try {
      const response = await axios.get<GetCurrentPermissionsResponse>(
        "/admin/getCurrentPermissions"
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch current permissions:", error);
      throw error;
    }
  };

/**
 * Fetches permissions with caching support
 * @param forceRefresh - If true, bypasses any caching mechanisms
 * @returns Promise<GetCurrentPermissionsResponse> - User's permissions as array of strings
 */
export const getCurrentPermissionsWithCache = async (
  forceRefresh = false
): Promise<GetCurrentPermissionsResponse> => {
  try {
    const params = forceRefresh ? { refresh: true } : {};
    const response = await axios.get<GetCurrentPermissionsResponse>(
      "/admin/getCurrentPermissions",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current permissions with cache:", error);
    throw error;
  }
};
