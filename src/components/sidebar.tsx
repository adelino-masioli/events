import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen">
      <nav className="mt-5 px-2">
        <Link
          href="/dashboard/profile"
          className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Perfil
        </Link>
        {/* Add more navigation items as needed */}
      </nav>
    </aside>
  );
}
