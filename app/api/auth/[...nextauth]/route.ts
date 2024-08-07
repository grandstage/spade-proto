import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({

      async authorize(credentials, req) {
        const response = await fetch(`http://localhost:8000/api/login/`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,

          }),
          credentials: 'include',
        });

        if (response.status === 400) {
          throw new Error("Invalid credentials");
        } else if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        if (data.message === "Login Successful") {
          return { username: credentials.username };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
