import User from "@/models/user.model";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // Database connect
        await connectDB();

        // Find user exists
        const user = await User.findOne({ email });
        if (!user) throw new Error("User doesn't exists");

        // Match password
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          throw new Error("Invalid Credentials");
        }

        // Check verification
        if (!user.isVerified) throw new Error("Please Verify your email.");

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

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/login",
  },
};

// export const otpResend = () => {
//    sessionStorage.setItem("registerEmail", email);
//   router.push("/verify");
//   setOpenLoginForm(false);

// };
