import React from 'react';

import {
  Bell,
  Search,
  ShieldCheck,
} from 'lucide-react';

const AdminNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="w-full flex items-center justify-between mb-10">

      {/* LEFT */}
      <div>
        <h2 className="text-3xl font-black text-white">
          Welcome Back
        </h2>

        <p className="text-slate-400 mt-1">
          Cognitive Analytics Control Center
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search participants..."
            className="
              bg-[#131C31]
              border
              border-slate-800
              rounded-2xl
              pl-12
              pr-5
              py-3
              text-white
              outline-none
              focus:border-cyan-500
              w-[280px]
            "
          />
        </div>

        {/* NOTIFICATIONS */}
        <button
          className="
            w-12
            h-12
            rounded-2xl
            bg-[#131C31]
            border
            border-slate-800
            flex
            items-center
            justify-center
            text-slate-400
            hover:border-cyan-500
            hover:text-white
            transition-all
          "
        >
          <Bell size={20} />
        </button>

        {/* ADMIN PROFILE */}
        <div
          className="
            flex
            items-center
            gap-3
            bg-[#131C31]
            border
            border-slate-800
            px-5
            py-3
            rounded-2xl
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-cyan-500/20
              flex
              items-center
              justify-center
            "
          >
            <ShieldCheck
              className="text-cyan-400"
              size={22}
            />
          </div>

          <div>
            <h3 className="text-white font-semibold">
              {user?.name || 'Admin'}
            </h3>

            <p className="text-slate-400 text-sm">
              System Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;