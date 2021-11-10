export default class InputError extends Error {
  constructor(message: string = 'Wrong input') {
    super(message);
  }
  status = 400;
}
