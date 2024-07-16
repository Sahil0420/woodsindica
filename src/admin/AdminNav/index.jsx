import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";

const admin_nav = [
  {
    display: "Dashboard",
    path: "/dashboard/admin",
  },
  {
    display: "All Products",
    path: "/dashboard/all-product",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Add Product",
    path: "/dashboard/add-product",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 rounded-2xl">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-2xl">
            <div>
              <h2 className="text-xl font-bold text-black px-4 py-2">
                WoodsIndica
              </h2>
            </div>
            <div className="flex flex-col justify-center flex-1 gap-3">
              {admin_nav.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
                >
                  {item.display}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-end h-16 bg-white border-b border-gray-200">
          {/* Notification and Settings */}
        </div>

        {/* Content area */}
        <div className="p-4">{/* Your main content goes here */}</div>
      </div>
    </div>
  );
};

export default AdminNav;
