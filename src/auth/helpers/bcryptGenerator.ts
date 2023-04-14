import { compareSync, hashSync } from 'bcryptjs';

export const generateHash = (password: string) => {
  return hashSync(password, 10);
};

export const compareHash = (password: string, hash: string) => {
  return compareSync(password, hash);
};
