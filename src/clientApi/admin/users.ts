import { User } from "../../api/users";
import { fetchApi } from "../common";

const baseUrl = '/api/admin/users';

export const getUsers = () => fetchApi<User[]>(baseUrl);
