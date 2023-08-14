export const authenticateUser = async (req, res, next) => {
  console.log('authentication middleware');
  next();
};
