import type { NextApiResponse } from 'next';
import { createFood, findFood, Food } from '../../../../src/api/food';
import InputError from '../../../../src/utils/errors/InputError';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withUserSession from '../../../../src/utils/middleware/withUserSession';

async function handleGet(req: NextApiRequestWithSession, res: NextApiResponse<Food[]>) {
  const { session } = req;

  const { date: dateString } = req.query;
  let date: Date | undefined;
  if (typeof dateString === 'string') {
    date = new Date(dateString);
  }

  const foodEntries = await findFood(undefined, session.id, date);

  res.status(200).json(foodEntries);
}

async function handlePost(req: NextApiRequestWithSession, res: NextApiResponse) {
  const { name, calories, consumedAt } = (req.body) as Food;
  if (!name || !calories || !consumedAt) {
    throw new InputError();
  }

  const { session } = req;
  const newEntry = await createFood({ name, calories, consumedAt }, session.id);

  res.status(201).json(newEntry);
}

async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      await handleGet(req, res);
      break;
    case 'post':
      await handlePost(req, res);
      break;
    default:
      res.status(404).send('');
  }
}

export default withErrorHandling(withUserSession(handler));
