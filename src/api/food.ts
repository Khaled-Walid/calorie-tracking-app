import { Prisma } from '.prisma/client';
import prismaClient from '../../prisma/client';
import AuthorizationError from '../utils/errors/AuthorizationError';

export type Food = {
  id?: string;
  name: string;
  calories: number;
  consumedAt: Date | string;
};

export async function findFood(foodId?: string, userId?: string, date?: Date): Promise<Food[]> {
  let consumedAtFilter: Prisma.DateTimeFilter | undefined = undefined;
  if (date) {
    const today = new Date(date.toDateString());
    consumedAtFilter = {
      gte: today,
      lt: new Date(+today + 24 * 60 * 60 * 1000),
    }
  }

  const result = await prismaClient.consumedFood.findMany({
    where: {
      id: foodId,
      userId,
      consumedAt: consumedAtFilter,
    },
  });
  return result.map(({ id, name, calories, consumedAt }) => ({
    id,
    name,
    calories,
    consumedAt,
  }));
}

export async function createFood({ id, name, calories, consumedAt }: Food, userId: string): Promise<Food> {
  const result = await prismaClient.consumedFood.create({
    data: {
      id,
      name,
      calories,
      userId,
      consumedAt: new Date(consumedAt),
    },
  });
  return {
    id: result.id,
    name: result.name,
    calories: result.calories,
    consumedAt: result.consumedAt,
  };
}

export async function updateFood({ id, name, calories, consumedAt }: Food, userId?: string): Promise<Food> {
  if (userId) {
    const existing = await prismaClient.consumedFood.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!existing) {
      throw new AuthorizationError();
    }
  }

  const result = await prismaClient.consumedFood.update({
    where: {
      id,
    },
    data: {
      name,
      calories,
      consumedAt: new Date(consumedAt),
    },
  });

  return {
    id: result.id,
    name: result.name,
    calories: result.calories,
    consumedAt: result.consumedAt,
  };
}

export async function deleteFood(foodId: string, userId?: string): Promise<void> {
  if (userId) {
    const existing = await prismaClient.consumedFood.findFirst({
      where: {
        id: foodId,
        userId,
      },
    });
    if (!existing) {
      throw new AuthorizationError();
    }    
  }

  await prismaClient.consumedFood.delete({
    where: {
      id: foodId,
    },
  });
}
