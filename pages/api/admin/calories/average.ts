import type { NextApiResponse } from 'next';
import { getUserAverageCalories } from '../../../../src/api/users';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withAdminSession from '../../../../src/utils/middleware/withAdminSession';
import InputError from '../../../../src/utils/errors/InputError';

async function handleGet(req: NextApiRequestWithSession, res: NextApiResponse<number>) {
  const { userId, startDate: startDateStr, endDate: endDateStr } = req.query;

  if (typeof userId !== 'string' || typeof startDateStr !== 'string' || typeof endDateStr !== 'string') {
    throw new InputError();
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const result = await getUserAverageCalories(userId, startDate, endDate);

  res.status(200).json(result);
}

async function handler(
  req: NextApiRequestWithSession,
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

export default withErrorHandling(withAdminSession(handler));
