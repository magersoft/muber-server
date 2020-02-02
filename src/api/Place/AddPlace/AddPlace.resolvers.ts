import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import Place from '../../../entities/Place';
import { AddPlaceMutationArgs, AddPlaceResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(async(_, args: AddPlaceMutationArgs, { req }): Promise<AddPlaceResponse> => {
      const user: User = req.user;
      try {
        await Place.create({ ...args, user }).save();
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
