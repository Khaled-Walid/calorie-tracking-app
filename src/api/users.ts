import { Role, UserPermission } from '.prisma/client';
import prismaClient from '../../prisma/client';
import InputError from '../utils/errors/InputError';

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

export async function getUserRoles(userId: string): Promise<string[]> {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      account: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!user || !user.account) {
    throw new InputError();
  }

  return user.account.permissions.map(perm => perm.role.toString());
}

export async function getUserAverageCalories(userId: string, startDate: Date, endDate: Date): Promise<number> {
  const foodAggregate = await prismaClient.consumedFood.aggregate({
    _sum: {
      calories: true,
    },
    where: {
      userId,
      consumedAt: {
        gte: startDate,
        lt: endDate,
      }
    }
  });

  const numberOfDays = 7;

  if (!foodAggregate || foodAggregate._sum.calories === null) {
    throw new InputError();
  }

  return foodAggregate._sum.calories / numberOfDays;
}

export async function getUserCalorieLimit(userId: string): Promise<number> {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      account: true,
    },
  });

  if (!user || !user.account) {
    throw new InputError();
  }

  return user.account.calorieLimit;
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
