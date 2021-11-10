import type { NextApiRequest } from 'next';
import type SessionWithId from './SessionWithId';

type NextApiRequestWithSession = NextApiRequest & {
  session: SessionWithId;
};

export default NextApiRequestWithSession;
