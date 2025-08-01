import { connectToDatabase } from "../_lib/db";
import bcrypt from "bcryptjs";
type Credentials = {
  email: string;
  password: string;
};
export default async function getUser(credentials: Credentials) {
  const db = await connectToDatabase();
  try {
    const request = await db.request();
    request.input("email", credentials.email);
    const response = await request.query(
      "SELECT id, email, password FROM Users WHERE email = @email"
    );
    const user = response.recordset[0];
    if (!user) throw new Error("User does not exist");
    const checkPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!checkPassword) throw new Error("Wrong password");
    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
  }
}
