import { Role } from '.prisma/client';
import { NextApiHandler } from 'next';
import prismaClient from '../../../prisma/client';
import AuthorizationError from '../errors/AuthorizationError';
import withUserSession, { NextApiHandlerWithSession } from './withUserSession';

export default function withAdminSession<T>(handler: NextApiHandlerWithSession<T>): NextApiHandler<T> {
  const intermediate: NextApiHandlerWithSession<T> = async (req, res) => {
    const { session } = req;

    const adminUser = await prismaClient.user.findFirst({
      where: {
        id: session.id,
        account: {
          permissions: {
            some: {
              role: {
                equals: Role.ADMIN,
              },
            },
          },
        },
      },
    });

    if (!adminUser) {
      throw new AuthorizationError();
    }

    await handler(req, res);
  }

  return withUserSession(intermediate);
}
