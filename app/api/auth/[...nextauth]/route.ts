import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function getCsrfToken() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const csrfToken = response.headers.get("X-CSRFToken") || "";
  return csrfToken;
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { },
        password: { },
      },
      async authorize(credentials) {
        try {
          const csrfToken = await getCsrfToken();
          // Send POST request to Django backend for authentication
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken, 
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user; // Assuming `user` contains `{ id, email, etc. }`
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
