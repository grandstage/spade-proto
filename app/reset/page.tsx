import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import ResetPasswordForm from "./form";
import "../../styles/login.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Spade AI",
};

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) => {
  const { token, email } = searchParams;

  if (!token || !email) {
    redirect("/");
    return null;
  }

  // Check if user exists and validate the token
  const userResponse = await sql`SELECT * FROM users WHERE email=${email}`;
  const user = userResponse.rows[0];

  if (!user) {
    redirect("/");
    return null;
  }

  const isValidToken = await compare(token, user.reset_token);
  const isTokenExpired = new Date(user.reset_token_expiry) < new Date();

  if (!isValidToken || isTokenExpired) {
    redirect("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ResetPasswordForm email={email} token={token} />
    </div>
  );
};

export default ResetPasswordPage;
