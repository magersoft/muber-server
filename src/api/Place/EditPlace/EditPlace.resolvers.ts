import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { EditPlaceMutationArgs, EditPlaceResponse } from '../../../types/graph';
import Place from '../../../entities/Place';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(async (_, args: EditPlaceMutationArgs, { req }): Promise<EditPlaceResponse> => {
      const user: User = req.user;
      try {
        const place = await Place.findOne({ id: args.placeId });
        if (place) {
          if (place.userId === user.id) {
            const notNull = cleanNullArgs(args);
            await Place.update({ id: args.placeId }, { ...notNull });
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: 'Not Authorized'
            }
          }
        } else {
          return {
            ok: false,
            error: 'Place not found'
          }
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
