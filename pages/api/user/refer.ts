import type { NextApiResponse } from 'next';
import InputError from '../../../src/utils/errors/InputError';
import NextApiRequestWithSession from '../../../src/utils/types/NextApiRequestWithSession';
import withErrorHandling from '../../../src/utils/middleware/withErrorHandling';
import withUserSession from '../../../src/utils/middleware/withUserSession';
import { referFriend } from '../../../src/api/refer';

type CreateReferParams = {
  name: string;
  email: string;
}

async function handlePost(req: NextApiRequestWithSession, res: NextApiResponse) {
  const { name, email } = (req.query) as CreateReferParams;
  if (!name || !email) {
    throw new InputError();
  }

  const { session } = req;
  await referFriend({
    name,
    email,
    refererName: session.user?.name || '',
  });

  res.status(204).send('');
}

async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      await handlePost(req, res);
      break;
    default:
      res.status(404).send('');
  }
}

export default withErrorHandling(withUserSession(handler));
