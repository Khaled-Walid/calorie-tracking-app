import prismaClient from '../../prisma/client';

export type User = {
  id?: string;
  name?: string;
  email: string;
};

export async function findUsers(): Promise<User[]> {
  const result = await prismaClient.user.findMany();
  return result.map(u => ({
    id: u.id,
    name: u.name ?? undefined,
    email: u.email,
  }));
}
