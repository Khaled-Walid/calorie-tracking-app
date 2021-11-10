import prismaClient from '../../prisma/client';
import AuthorizationError from '../utils/errors/AuthorizationError';

export type Food = {
  id?: string;
  name: string;
  calories: number;
};

export async function findFood(foodId?: string, userId?: string): Promise<Food[]> {
  const result = await prismaClient.consumedFood.findMany({
    where: {
      id: foodId,
      userId,
    }
  });
  return result.map(({ id, name, calories }) => ({
    id,
    name,
    calories
  }));
}

export async function createFood({ id, name, calories }: Food, userId: string): Promise<Food> {
  const result = await prismaClient.consumedFood.create({
    data: {
      id,
      name,
      calories,
      userId,
    },
  });
  return {
    id: result.id,
    name: result.name,
    calories: result.calories,
  };
}

export async function updateFood({ id, name, calories }: Food, userId?: string): Promise<Food> {
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
    },
  });

  return {
    id: result.id,
    name: result.name,
    calories: result.calories,
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
