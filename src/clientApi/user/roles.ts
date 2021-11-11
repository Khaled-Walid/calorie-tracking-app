import { fetchApi } from "../common";

const baseUrl = '/api/user/roles';

export const getUserRoles = () => fetchApi<string[]>(baseUrl);
