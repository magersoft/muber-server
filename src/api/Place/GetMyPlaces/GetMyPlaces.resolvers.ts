import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { GetMyPlacesResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(async (_, __, { req }): Promise<GetMyPlacesResponse> => {
      try {
        const user = await User.findOne(
          { id: req.user.id },
          { relations: ['places'] }
          );
        if (user) {
          return {
            ok: true,
            places: user.places,
            error: null
          }
        } else {
          return {
            ok: false,
            places: null,
            error: 'User not found'
          }
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          places: null
        }
      }
    })
  }
};

export default resolvers;
