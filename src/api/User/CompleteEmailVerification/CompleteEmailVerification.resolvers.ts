import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from '../../../types/graph';
import Verification from '../../../entities/Verification';

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async(
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }): Promise<CompleteEmailVerificationResponse> => {
      const user: User = req.user;
      const { key } = args;
      if (user.email) {
        try {
          const verification = await Verification.findOne({ key, payload: user.email });

          if (verification) {
            user.verifiedEmail = true;
            user.save();

            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: 'Can\'t verify email'
            }
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message
          }
        }
      } else {
        return {
          ok: false,
          error: 'No email to verify'
        }
      }
    })
  }
};

export default resolvers;
