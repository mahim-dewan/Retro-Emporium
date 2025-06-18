import User from "@/models/user.model";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await connectDB();
        console.log("DB connected");

        const user = await User.findOne({ email });
        if (!user) throw new Error("User doesn't exists");

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          throw new Error("Invalid Credentials");
        }
        const { _id, firstname, lastname, role, isVerified } = user;

        return {
          id: _id,
          name: firstname + " " + lastname,
          email: user.email,
          role,
          isVerified,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(user, "user");
      if (user) {
        token.user = user;
      }
      console.log("jwt", token);

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      console.log(session, "session");

      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/login",
  },
};
