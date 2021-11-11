import { fetchApi } from "../common";

const baseUrl = '/api/admin/calories';

export const getUserAverageCalories = (userId: string, startDate: Date, endDate: Date) => (
  fetchApi<number>(baseUrl + '/average?' + new URLSearchParams({
    userId,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }))
);
