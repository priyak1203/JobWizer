import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  // random value that is added to the password before hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
