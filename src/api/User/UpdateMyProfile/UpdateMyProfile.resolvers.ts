import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from '../../../types/graph';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args: UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
      const user: User = req.user;
      const notNull: any = cleanNullArgs(args);
      if (notNull.password) {
        user.password = notNull.password;
        user.save();
        delete notNull.password;
      }
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
