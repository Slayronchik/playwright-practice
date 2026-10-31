import { randomBytes } from 'node:crypto';

export interface RandomUser {
  email: string;
  password: string;
}

export function generateRandomUser(): RandomUser {
  return {
    email: `test+${Date.now()}@example.com`,
    password: randomBytes(16).toString('hex'),
  };
}
