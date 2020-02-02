const privateResolver = (resolverFunction) => async (parent, args, context, info) => {
  if (!context.req.user) {
    throw new Error("No JWT. I refuse to proceed");
  }
  return await resolverFunction(parent, args, context, info);
};

export default privateResolver;
