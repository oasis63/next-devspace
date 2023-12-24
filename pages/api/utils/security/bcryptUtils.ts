import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}
