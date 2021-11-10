import type { NextApiResponse } from 'next';
import NextApiRequestWithSession from '../../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../../src/utils/middleware/withErrorHandling';
import withAdminSession from '../../../../src/utils/middleware/withAdminSession';
import { User, findUsers } from '../../../../src/api/users';

async function handleGet(_req: NextApiRequestWithSession, res: NextApiResponse<User[]>) {
  const result = await findUsers();

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
