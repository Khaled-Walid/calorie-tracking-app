import { NextApiHandler, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import AuthorizationError from '../errors/AuthorizationError';
import NextApiRequestWithSession from '../types/NextApiRequestWithSession';
import SessionWithId from '../types/SessionWithId';

export type NextApiHandlerWithSession<T = any> = (req: NextApiRequestWithSession, res: NextApiResponse<T>) => void | Promise<void>;

export default function withUserSession<T>(handler: NextApiHandlerWithSession<T>): NextApiHandler<T> {
  return async (req, res) => {
    const session = await getSession({ req }) as SessionWithId;

    if (!session) {
      throw new AuthorizationError();
    }

    const newReq = req as NextApiRequestWithSession;
    newReq.session = session;

    await handler(newReq, res);
  };
}
