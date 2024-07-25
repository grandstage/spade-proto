import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import sendgrid from "@sendgrid/mail";
import crypto from "crypto";
import { hash } from "bcrypt";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if user exists
    const userResponse = await sql`SELECT * FROM users WHERE email=${email}`;
    const user = userResponse.rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "No user found with that email address" },
        { status: 404 }
      );
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await hash(resetToken, 10);
    const tokenExpiry = new Date(Date.now() + 3600000).toISOString();

    // Save the token and expiry to the database
    await sql`
        UPDATE users 
        SET reset_token=${hashedToken}, reset_token_expiry=${tokenExpiry} 
        WHERE email=${email}
      `;

    // Send the reset email
    const resetUrl = `${
      new URL(request.url).origin
    }/reset?token=${resetToken}&email=${email}`;
    const msg = {
      to: email,
      from: "info@email.getspade.ai",
      subject: "Password Reset Request",
      html: `
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
        `,
    };

    try {
      await sendgrid.send(msg);
      return NextResponse.json({
        message: "Password reset instructions sent to your email.",
      });
    } catch (error) {
      console.error("SendGrid error:", error);
      return NextResponse.json(
        { message: "Failed to send reset instructions." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
