import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { ReportMovementMutationArgs, ReportMovementResponse } from '../../../types/graph';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
      _,
      args: ReportMovementMutationArgs,
      { req }
    ): Promise<ReportMovementResponse> => {
      const user: User = req.user;
      const notNull = cleanNullArgs(args);
      try {
        await User.update({ id: user.id }, { ...notNull });
        return {
          ok: true,
          error: null
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message
        }
      }
    })
  }
};

export default resolvers;
