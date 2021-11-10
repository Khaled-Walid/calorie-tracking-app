import { createUser } from './users';
import { encode } from 'next-auth/jwt';
import sendMail from '../utils/sendMail';

interface ReferFriendParams {
  email: string;
  name: string;
  refererName: string;
}

export async function referFriend(params: ReferFriendParams) {
  const password = '123'

  const newUser = await createUser({
    name: params.name,
    email: params.email,
  }, password);

  const jwt = {
    name: newUser.name,
    email: newUser.email,
    sub: newUser.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
  };

  const encodedToken = await encode({
    secret: process.env.JWT_SECRET || '',
    signingKey: process.env.JWT_SIGNING_KEY || '',
    token: jwt,
  });

  const message = `
    hello ${params.name}
    you have been invited to use calorie-counter by your friend ${params.refererName}
    you may login with this password: ${password}
    or use this token: ${encodedToken}
  `;

  await sendMail(params.email, message);
}
