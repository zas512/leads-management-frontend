import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Navigate, useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  if (!user && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
