import type { Session } from 'next-auth';

type SessionWithId = Session & {
  id: string;
};

export default SessionWithId;
