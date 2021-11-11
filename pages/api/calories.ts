import type { NextApiRequest, NextApiResponse } from 'next';
import { FoodCalorie, searchFood } from '../../src/api/calories';
import InputError from '../../src/utils/errors/InputError';
import withErrorHandling from '../../src/utils/middleware/withErrorHandling';

async function handleGet(req: NextApiRequest, res: NextApiResponse<FoodCalorie[]>) {
  const { query } = req.query;
  if (typeof query !== 'string') {
    throw new InputError();
  }

  const response = await searchFood(query);

  res.status(200).json(response);
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      await handleGet(req, res);
      break;
    default:
      res.status(404).send('');
  }
}

export default withErrorHandling(handler);