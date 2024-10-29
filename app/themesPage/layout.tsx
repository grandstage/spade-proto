import SideNav from "../components/navigation/sideNav";
import TopNav from "../components/navigation/topNav";
import ContentWrapper from "../components/main-content/ContentWrapper";
import "./themesPage.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <div className="Navigation">
          <TopNav />
          <SideNav />
          <div className="Content font-sans">
            <ContentWrapper />
          </div>
        </div>
      </body>
    </html>
  );
}
