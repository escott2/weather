import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import "./Layout.scss";

function Layout({ children }) {
  return (
    <div className="layout">
      <MainHeader />
      <main>{children}</main>
      <MainFooter />
    </div>
  );
}

export default Layout;
