import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import "../../styles/login.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Spade AI",
};

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form />
    </div>
  );
}
