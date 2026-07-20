import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-2xl font-semibold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="font-medium">
          {admin.name}
        </span>

        <button
          onClick={logout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}