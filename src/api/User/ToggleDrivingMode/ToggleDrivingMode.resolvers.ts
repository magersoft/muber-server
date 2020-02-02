import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { ToggleDrivingModeResponse } from '../../../types/graph';

const resolver: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(async(_, __, { req }): Promise<ToggleDrivingModeResponse> => {
      const user: User = req.user;
      user.isDriving = !user.isDriving;
      user.save();
      return {
        ok: true,
        error: null
      }
    })
  }
};

export default resolver;
