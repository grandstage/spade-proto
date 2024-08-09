import "./globals.scss";
import { getServerSession } from "next-auth";
import Logout from "./logout";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
