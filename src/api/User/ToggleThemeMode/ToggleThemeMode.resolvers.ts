import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { ToggleThemeModeResponse } from '../../../types/graph';

const resolver: Resolvers = {
  Mutation: {
    ToggleThemeMode: privateResolver(async (_, __, { req }): Promise<ToggleThemeModeResponse> => {
      const user: User = req.user;
      user.darkTheme = !user.darkTheme;
      try {
        await user.save();
        return { ok: true, error: null }
      } catch (e) {
        return { ok: false, error: e.message }
      }
    })
  }
};

export default resolver;
