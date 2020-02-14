import User from '../../../entities/User';
import Ride from '../../../entities/Ride';
import Chat from '../../../entities/Chat';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(async(_, args: UpdateRideStatusMutationArgs, { req, pubSub }): Promise<UpdateRideStatusResponse> => {
      const user: User = req.user;
      if (user.isDriving) {
        try {
          let ride: Ride | undefined;
          if (args.status === 'ACCEPTED') {
            ride = await Ride.findOne({ id: args.rideId, status: 'REQUESTING' }, { relations: ['passenger', 'driver'] });
            if (ride) {
              ride.driver = user;
              user.isTaken = true;
              user.save();
              ride.chat = await Chat.create({
                driver: user,
                passenger: ride.passenger
              }).save();
              ride.save();
            }
          } else {
            ride = await Ride.findOne({
              id: args.rideId,
              driver: user
            }, { relations: ['passenger', 'driver'] });
            if (args.status === 'FINISHED') {
              if (ride) {
                const passenger = await User.findOne({ id: ride.passenger.id });
                if (passenger) {
                  passenger.isRiding = false;
                  passenger.save();
                }
                const driver = await User.findOne({ id: ride.driver.id });
                if (driver) {
                  driver.isTaken = false;
                  driver.save();
                }
              }
            }
          }
          if (ride) {
            ride.status = args.status;
            ride.save();
            pubSub.publish('rideUpdate', { RideStatusSubscription: ride });
            return { ok: true, error: null, rideId: ride.id }
          } else {
            return {
              ok: false,
              error: 'Can\'t update ride',
              rideId: null
            }
          }
        } catch (e) {
          return { ok: false, error: e.message, rideId: null }
        }
      } else {
        return { ok: false, error: 'You are not driver', rideId: null }
      }
    })
  }
};

export default resolvers;