import type { NextApiResponse } from 'next';
import { getUserCalorieLimit } from '../../../../src/api/users';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withUserSession from '../../../../src/utils/middleware/withUserSession';

async function handleGet(req: NextApiRequestWithSession, res: NextApiResponse<number>) {
  const { session } = req;

  const result = await getUserCalorieLimit(session.id);

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

export default withErrorHandling(withUserSession(handler));
