import { NextApiHandler } from 'next';

export default function withErrorHandling<T>(handler: NextApiHandler<T>): NextApiHandler<T> {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      const status = err.status ?? 500;
      res.status(status).send(err.toString());
    }
  };
}
