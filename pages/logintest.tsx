import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
const TestLogin: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <div>
      {!session && !loading && <button onClick={() => signIn()}>Sign in</button>}
      {session && !loading && <button onClick={() => signOut()}>Sign out</button>}
      {loading && "loading"}
      {!loading && session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}

export default TestLogin;
