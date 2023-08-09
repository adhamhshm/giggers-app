//this session is used to keep the data of the currently logged in user

import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters"; //import { AdapterUser} from "next-auth/adapters" -> seems not to work
import GoogleProvider from "next-auth/providers/google"
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            //clientId: process.env.GOOGLE_CLIENT_ID || "", -> means it can be an empty string
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: "grafbase",
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
            }, secret)
            return encodedToken;
        },
        decode: ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret);
            return decodedToken as JWT;
        }
    },
    theme: {
        colorScheme: "light",
        logo: "/logo.svg"
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string;

            try {
                const data = await getUser(email) as { user?: UserProfile };
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user,
                    }
                }
                return newSession;
            } 
            catch (error: any) {
                console.log("Error retrieving user data: ", error.message)
                return session;
            }
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                //get the user if they are exist
                const userExists = await getUser(user?.email! as string) as { user?: UserProfile };

                //if the user doesn't exist, create them
                if (!userExists.user) {
                    //await create user
                    await createUser(user.name as string, user.email as string, user.image as string);
                    //console.log("create user!");
                }

                return true;
            } 
            catch (error: any) {
                console.log("Error signing in: " + error.message)
                return false;
            }
        },
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}