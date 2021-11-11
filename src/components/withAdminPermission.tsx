import { ComponentType } from "react";
import { useQuery } from "react-query";
import { getUserRoles } from "../clientApi/user/roles";

export function withAdminPermission<T extends object>(Component: ComponentType<T>) {
  return function RequireAdmin(props: any) {
    const { data: roles } = useQuery('userroles', getUserRoles);
    const isAdmin = roles && roles.some(role => role === 'ADMIN');

    return isAdmin ? (
      <Component {...props}/>
    ) : 'You are not allowed to view this page';
  }
}
