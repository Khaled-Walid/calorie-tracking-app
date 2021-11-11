import { fetchApi } from "../common";

const baseUrl = '/api/user/calories';

export const getUserAverageCalories = () => fetchApi<number>(baseUrl + '/limit');
