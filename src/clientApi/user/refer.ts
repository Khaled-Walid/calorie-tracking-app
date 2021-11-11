import { fetchApiNoResponse } from "../common";

const baseUrl = '/api/user/refer';

export const referFriend = (name: string, email: string) => fetchApiNoResponse(baseUrl + '?' + new URLSearchParams({
  name,
  email,
}), {
  method: 'POST'
});
