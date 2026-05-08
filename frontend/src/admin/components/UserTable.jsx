import React from 'react';

import { Link } from 'react-router-dom';

import {
  Eye,
  ShieldAlert,
  Activity,
} from 'lucide-react';

const UserTable = ({ users = [] }) => {

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High':
        return 'bg-red-500/20 text-red-400';

      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400';

      default:
        return 'bg-green-500/20 text-green-400';
    }
  };

  return (
    <div
      className="
        bg-[#131C31]
        border
        border-slate-800
        rounded-3xl
        overflow-hidden
      "
    >

      <div className="p-6 border-b border-slate-800">

        <h2 className="text-2xl font-black text-white">
          Participant Records
        </h2>

        <p className="text-slate-400 mt-1">
          Manage all registered participants
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#0B1120]">

            <tr>

              <th className="text-left p-5 text-slate-400 font-medium">
                Participant
              </th>

              <th className="text-left p-5 text-slate-400 font-medium">
                Attempts
              </th>

              <th className="text-left p-5 text-slate-400 font-medium">
                Avg Score
              </th>

              <th className="text-left p-5 text-slate-400 font-medium">
                Risk Level
              </th>

              <th className="text-left p-5 text-slate-400 font-medium">
                Status
              </th>

              <th className="text-left p-5 text-slate-400 font-medium">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="
                  border-t
                  border-slate-800
                  hover:bg-[#0B1120]
                  transition-all
                "
              >

                {/* USER */}
                <td className="p-5">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-cyan-500/20
                        flex
                        items-center
                        justify-center
                        text-cyan-400
                        font-bold
                      "
                    >
                      {user.name?.charAt(0)}
                    </div>

                    <div>

                      <h3 className="text-white font-semibold">
                        {user.name}
                      </h3>

                      <p className="text-slate-400 text-sm">
                        {user.email}
                      </p>

                    </div>
                  </div>
                </td>

                {/* ATTEMPTS */}
                <td className="p-5 text-cyan-400 font-semibold">
                  {user.attempts || 0}
                </td>

                {/* SCORE */}
                <td className="p-5">

                  <div className="flex items-center gap-2">

                    <Activity
                      size={16}
                      className="text-green-400"
                    />

                    <span className="text-white font-semibold">
                      {user.avgScore || 0}%
                    </span>
                  </div>
                </td>

                {/* RISK */}
                <td className="p-5">

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                      font-semibold
                      ${getRiskColor(user.risk)}
                    `}
                  >
                    {user.risk || 'Low'}
                  </span>

                </td>

                {/* STATUS */}
                <td className="p-5">

                  <div className="flex items-center gap-2">

                    <div
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-green-400
                      "
                    />

                    <span className="text-green-400 text-sm">
                      Active
                    </span>

                  </div>

                </td>

                {/* ACTION */}
                <td className="p-5">

                  <Link
                    to={`/admin/users/${user._id}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-cyan-500/20
                      text-cyan-400
                      hover:bg-cyan-500
                      hover:text-white
                      transition-all
                    "
                  >
                    <Eye size={16} />

                    View
                  </Link>

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;