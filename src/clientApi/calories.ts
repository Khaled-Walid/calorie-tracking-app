import { FoodCalorie } from "../api/calories";
import { fetchApi } from "./common";

const baseUrl = '/api/calories';

export const findFood = (query: string) => fetchApi<FoodCalorie[]>(baseUrl + '?' + new URLSearchParams({
  query,
}));
