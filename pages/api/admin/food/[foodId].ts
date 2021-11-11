import type { NextApiResponse } from 'next';
import AuthorizationError from '../../../../src/utils/errors/AuthorizationError';
import { Food, findFood, updateFood, deleteFood } from '../../../../src/api/food';
import InputError from '../../../../src/utils/errors/InputError';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withAdminSession from '../../../../src/utils/middleware/withAdminSession';

async function handleGet(foodId: string, _req: NextApiRequestWithSession, res: NextApiResponse<Food>) {
  const foodEntries = await findFood(foodId);

  if (foodEntries.length !== 1) {
    throw new AuthorizationError();
  }

  res.status(200).json(foodEntries[0]);
}

async function handlePut(foodId: string, req: NextApiRequestWithSession, res: NextApiResponse) {
  const { name, calories, consumedAt } = (req.body) as Food;
  if (!name || !calories || !consumedAt) {
    throw new InputError();
  }

  await updateFood({ id: foodId, name, calories, consumedAt });

  res.status(204).send('');
}

async function handleDelete(foodId: string, _req: NextApiRequestWithSession, res: NextApiResponse) {
  await deleteFood(foodId);

  res.status(204).send('');
}

async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  const { foodId } = req.query;
  if (!foodId || typeof foodId !== 'string') {
    throw new InputError();
  }

  switch (req.method?.toLowerCase()) {
    case 'get':
      await handleGet(foodId, req, res);
      break;
    case 'put':
      await handlePut(foodId, req, res);
      break;
    case 'delete':
      await handleDelete(foodId, req, res);
      break;
    default:
      res.status(404).send('');
  }
}

export default withErrorHandling(withAdminSession(handler));
