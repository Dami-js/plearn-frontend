import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NEXT_PUBLIC_API_URL } from "utils/constants";

interface Course {
  id: number;
  title: string;
}

type LearningStyle = "activist" | "pragmatist" | "reflector" | "theorist";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  level?: string;
  title?: string;
  password: string;
  isStudent: boolean;
  learningStyle?: LearningStyle | null;
  coursesCreated?: Course[];
}

interface ICredentials {
  username: string;
  password: string;
}

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: ICredentials): Promise<any> => {
        const h = {
          "Content-type": "application/json; charset=UTF-8",
        };
        try {
          const response = await axios({
            method: "POST",
            url: `${NEXT_PUBLIC_API_URL}/auth/login`,
            data: { ...credentials },
            headers: { ...h },
          });
          return Promise.resolve(response.data);
        } catch (error) {
          console.log(error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      return { ...user, ...token };
    },
    session: async (session, user) => {
      const { iat, exp, sub, ...u } = user;
      session.user = { ...u };
      return { ...session };
    },
  },
  session: {
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: "secret",
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
