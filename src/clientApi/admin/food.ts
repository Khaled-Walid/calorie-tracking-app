import { fetchApi, fetchApiNoResponse } from "../common";
import type { Food } from '../../api/food';

const baseUrl = '/api/admin/food';

export const getFood = (userId: string, date?: Date) => {
  const params = {
    userId
  };
  if (date) {
    (params as any).date = date;
  }
  return fetchApi<Food[]>(baseUrl + '?' + new URLSearchParams(params));
}

export const addFood = (userId: string, food: Food) => fetchApi<Food>(baseUrl + '?' + new URLSearchParams({
  userId,
}), {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(food),
});

export const getFoodById = (id: string) => fetchApi<Food>(`${baseUrl}/${id}`);

export const updateFoodById = (id: string, food: Food) => fetchApiNoResponse(`${baseUrl}/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(food),
});

export const deleteFoodById = (id: string) => fetchApiNoResponse(`${baseUrl}/${id}`, {
  method: 'DELETE',
});
