import { fetchApi } from "../common";

const baseUrl = '/api/user/calories';

export const getUserCalorieLimit = () => fetchApi<number>(baseUrl + '/limit');
