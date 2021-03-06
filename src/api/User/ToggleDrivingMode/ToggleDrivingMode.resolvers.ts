import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { ToggleDrivingModeResponse } from '../../../types/graph';

const resolver: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(async(_, __, { req }): Promise<ToggleDrivingModeResponse> => {
      const user: User = req.user;
      user.isDriving = !user.isDriving;
      try {
        await user.save();
        return {
          ok: true,
          error: null
        }
      } catch (e) {
        return { ok: false, error: e.message }
      }
    })
  }
};

export default resolver;
