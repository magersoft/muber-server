import { RequestEmailExistMutationArgs, RequestEmailExistResponse } from '../../../types/graph';
import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailExist: async (_, args: RequestEmailExistMutationArgs): Promise<RequestEmailExistResponse> => {
      const { email } = args;

      try {
        const user = await User.findOne({ email });
        if (user) {
          return {
            ok: true,
            error: null,
            exist: true
          }
        } else {
          return {
            ok: true,
            error: null,
            exist: false
          }
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          exist: false
        }
      }
    }
  }
};

export default resolvers;
