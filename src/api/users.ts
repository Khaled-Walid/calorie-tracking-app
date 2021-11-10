import { Role, UserPermission } from '.prisma/client';
import prismaClient from '../../prisma/client';

export type User = {
  id?: string;
  name?: string;
  email: string;
};

let userPermissions: UserPermission[] | null = null;

async function regularUserPermission(): Promise<UserPermission> {
  if (!userPermissions) {
    userPermissions = await prismaClient.userPermission.findMany();
  }  

  return userPermissions.find(p => p.role === Role.USER) as UserPermission;
}

export async function findUsers(): Promise<User[]> {
  const result = await prismaClient.user.findMany();
  return result.map(u => ({
    id: u.id,
    name: u.name ?? undefined,
    email: u.email,
  }));
}

export async function createUser(user: User, password: string) {
  const result = await prismaClient.user.create({
    data: {
      name: user.name,
      email: user.email,
      account: {
        create: {
          password,
          permissions: {
            connect: [{
              id: (await regularUserPermission()).id
            }],
          },
        },
      },
    },
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
  };
}
