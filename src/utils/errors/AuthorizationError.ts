export default class AuthorizationError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
  }
  status = 403;
}
