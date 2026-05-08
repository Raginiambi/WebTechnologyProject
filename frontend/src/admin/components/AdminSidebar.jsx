import React from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  LayoutDashboard,
  Users,
  Activity,
  Brain,
  LogOut,
} from 'lucide-react';

const links = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
  },

  {
    name: 'Users',
    icon: Users,
    path: '/admin/users',
  },

  {
    name: 'Tests',
    icon: Brain,
    path: '/admin/tests',
  },

  {
    name: 'Analytics',
    icon: Activity,
    path: '/admin/analytics',
  },
];

const AdminSidebar = () => {

  const location =
    useLocation();

  return (

    <div
      className="
        w-72
        min-h-screen
        bg-[#0B1120]
        border-r
        border-slate-800
        p-6
        flex
        flex-col
        justify-between
      "
    >

      {/* ================= TOP ================= */}

      <div>

        {/* LOGO */}

        <div className="mb-10">

          <h1
            className="
              text-4xl
              font-black
              admin-page-title
            "
          >
            SMRITI
          </h1>

          <p
            className="
              admin-text-cyan
              opacity-80
              mt-1
              text-lg
            "
          >
            Admin Panel
          </p>
        </div>

        {/* NAVIGATION */}

        <div className="space-y-3">

          {links.map((link) => {

            const Icon =
              link.icon;

            return (

              <Link
                key={link.path}

                to={link.path}

                className={`
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  transition-all
                  font-semibold

                  ${
                    location.pathname ===
                    link.path

                      ? `
                        bg-cyan-500
                        text-[#020817]
                        shadow-lg
                      `

                      : `
                        text-slate-400
                        hover:bg-slate-800
                        hover:text-[rgb(130,237,255)]
                      `
                  }
                `}
              >

                <Icon size={20} />

                {link.name}

              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= LOGOUT ================= */}

      <button

        onClick={() => {

          localStorage.removeItem(
            'user'
          );

          window.location.href =
            '/login';
        }}

        className="
          flex
          items-center
          gap-3

          bg-red-500
          hover:bg-red-600

          text-white

          p-4
          rounded-2xl

          transition-all
          font-semibold

          shadow-lg
        "
      >

        <LogOut size={18} />

        Logout

      </button>
    </div>
  );
};

export default AdminSidebar;