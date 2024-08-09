import { getServerSession } from "next-auth";
import Logout from "../logout";
import Header from "../components/header/header";
import Menu from "../components/menu/menu";

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await getServerSession();
    return (
      <html lang="en">
        <body>
        {session ? (
          <>
            <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
              <Header />
            </div>
            <div style={{ display: 'flex' }}>
              <Menu />
              <main style={{ flex: 1 }}>{children}</main>
              <Logout />
            </div>
          </>
        ) : (
          children
        )}
        </body>
      </html>
    );
  }
