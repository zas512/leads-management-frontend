import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/leads", label: "Leads", icon: "👥" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="flex flex-col justify-between p-4 w-48 min-h-screen bg-gray-200">
      {/* Menu Items */}
      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              currentPath === item.path
                ? "bg-white shadow-md"
                : "hover:bg-gray-300 hover:shadow-sm"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex gap-3 items-center px-4 py-2 mt-4 bg-red-200 rounded-lg shadow-md transition-colors"
      >
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
