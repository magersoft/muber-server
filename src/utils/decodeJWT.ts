import jwt from 'jsonwebtoken';
import User from '../entities/User';

const JWT_TOKEN: string = process.env.JWT_TOKEN || '';

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, JWT_TOKEN);
    const { id } = decoded;
    return await User.findOne({id});
  } catch (e) {
    return void 0;
  }
};

export default decodeJWT;
