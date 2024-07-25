import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    const hashedPassword = await hash(password, 10);
    console.log({ email, password, hashedPassword });
    console.log({
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    });
    const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }
    const response = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
        `;
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({ message: "success" });
}
