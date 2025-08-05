/**import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession } from "next-auth";
import getUser from "./getUser";
import Google from "next-auth/providers/google";
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const response = await getUser(credentials);
        if (!response) return null;
        return response;
      },
    }),
  ],
  ///sessions
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
export const auth = () => getServerSession(authConfig);
*/
