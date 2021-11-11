import type { NextApiResponse } from 'next';
import { getUserRoles } from '../../../src/api/users';
import NextApiRequestWithSession from '../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../src/utils/middleware/withErrorHandling';
import withUserSession from '../../../src/utils/middleware/withUserSession';

async function handleGet(req: NextApiRequestWithSession, res: NextApiResponse<string[]>) {
  const { session } = req;

  const roles = await getUserRoles(session.id);

  res.status(200).json(roles);
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
