import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="charts-grid">{children}</div>
      </div>
    </div>
  );
};

export default Layout;