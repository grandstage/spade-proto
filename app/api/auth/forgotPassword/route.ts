import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import sendgrid from "@sendgrid/mail";
import crypto from "crypto";
import { any } from "bcrypt";

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

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

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
