import type { NextApiResponse } from 'next';
import { createFood, findFood, Food } from '../../../../src/api/food';
import InputError from '../../../../src/utils/errors/InputError';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withAdminSession from '../../../../src/utils/middleware/withAdminSession';

async function handleGet(userId: string, _req: NextApiRequestWithSession, res: NextApiResponse<Food[]>) {
  const foodEntries = await findFood(undefined, userId);

  res.status(200).json(foodEntries);
}

async function handlePost(userId: string, req: NextApiRequestWithSession, res: NextApiResponse) {
  const { name, calories } = (req.body) as Food;
  if (!name || !calories) {
    throw new InputError();
  }

  const newEntry = await createFood({ name, calories }, userId);

  res.status(201).json(newEntry);
}

async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  const { userId } = req.query
  if (typeof userId !== 'string') {
    throw new InputError();
  }

  switch (req.method?.toLowerCase()) {
    case 'get':
      await handleGet(userId, req, res);
      break;
    case 'post':
      await handlePost(userId, req, res);
      break;
    default:
      res.status(404).send('');
  }
}

export default withErrorHandling(withAdminSession(handler));
