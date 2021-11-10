import type { NextApiResponse } from 'next';
import AuthorizationError from '../../../../src/utils/errors/AuthorizationError';
import { Food, findFood, updateFood, deleteFood } from '../../../../src/api/food';
import InputError from '../../../../src/utils/errors/InputError';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withUserSession from '../../../../src/utils/middleware/withUserSession';

async function handleGet(foodId: string, req: NextApiRequestWithSession, res: NextApiResponse<Food>) {
  const { session } = req;
  const foodEntries = await findFood(foodId, session.id);

  if (foodEntries.length !== 1) {
    throw new AuthorizationError();
  }

  res.status(200).json(foodEntries[0]);
}

async function handlePut(foodId: string, req: NextApiRequestWithSession, res: NextApiResponse) {
  const { name, calories } = (req.body) as Food;
  if (!name || !calories) {
    throw new InputError();
  }

  const { session } = req;
  await updateFood({ id: foodId, name, calories }, session.id);

  res.status(204);
}

async function handleDelete(foodId: string, req: NextApiRequestWithSession, res: NextApiResponse) {
  const { session } = req;
  await deleteFood(foodId, session.id);

  res.status(204);
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

export default withErrorHandling(withUserSession(handler));
