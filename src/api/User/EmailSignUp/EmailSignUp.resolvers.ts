import { Resolvers } from '../../../types/resolvers';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from '../../../types/graph';
import Verification from '../../../entities/Verification';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import { sendVerificationEmail } from '../../../utils/sendEmal';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return {
            ok: false,
            error: 'You should log in instead',
            token: null
          }
        } else {
          const newUser = await User.create({ ...args }).save();

          if (newUser.email) {
            const emailVerification = await Verification.create({
              payload: newUser.email,
              target: 'EMAIL'
            }).save();

            await sendVerificationEmail(newUser.fullName, emailVerification.key);
          }

          const token = createJWT(newUser.id);

          return {
            ok: true,
            error: null,
            token
          }
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          token: null
        }
      }
    }
  }
};


export default resolvers;
