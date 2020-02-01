import jwt from 'jsonwebtoken';

const JWT_TOKEN: string = process.env.JWT_TOKEN || '';

const createJWT = (userId: number): string => {
  return jwt.sign({
    id: userId,
  }, JWT_TOKEN);
};

export default createJWT;
