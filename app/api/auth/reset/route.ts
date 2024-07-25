import { NextResponse } from "next/server";
import { hash, compare } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { token, email, password } = await request.json();

    // Validate the token, email, and password
    if (!token || !email || !password) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Check if user exists
    const userResponse = await sql`SELECT * FROM users WHERE email=${email}`;
    const user = userResponse.rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or token" },
        { status: 400 }
      );
    }

    // Verify the token
    const isValidToken = await compare(token, user.reset_token);
    const isTokenExpired = new Date(user.reset_token_expiry) < new Date();

    if (!isValidToken || isTokenExpired) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update the user's password in the database
    await sql`
      UPDATE users 
      SET password=${hashedPassword}, reset_token=null, reset_token_expiry=null 
      WHERE email=${email}
    `;

    return NextResponse.json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
