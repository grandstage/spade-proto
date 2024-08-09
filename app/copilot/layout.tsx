// app/copilot/layout.tsx
import { getServerSession } from "next-auth";
import Header from '../components/header/header';
import Menu from '../components/menu/menu';
import Logout from '../logout';

export default async function CopilotLayout({
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
            <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gridTemplateColumns: 'auto 1fr', minHeight: '100vh' }}>
              <div style={{ gridRow: '1', gridColumn: '1 / span 2', position: 'fixed', width: '100%', top: 0 }}>
                <Header />
              </div>
              <div style={{ gridRow: '2', gridColumn: '1' }}>
                <Menu />
              </div>
              <main style={{ gridRow: '2', gridColumn: '2', }}>
                {children}
              </main>
            </div>
          </>
          ) : (
            children
          )}
      </body>
    </html>
  );
}
