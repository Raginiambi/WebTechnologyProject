import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  Trash2,
  Eye,
  Users,
} from 'lucide-react';

import AdminSidebar from '../components/AdminSidebar';

import {
  getUsers,
} from '../utils/adminApi';

const UsersPage = () => {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers =
    async () => {

      try {

        const data =
          await getUsers();

        setUsers(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  /* ================= DELETE USER ================= */

  const deleteUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          'Delete this participant?'
        );

      if (!confirmDelete) return;

      try {

        const user =
          JSON.parse(
            localStorage.getItem('user')
          );

        await fetch(
          `http://localhost:5000/api/admin/users/${id}`,
          {
            method: 'DELETE',

            headers: {
              Authorization:
                `Bearer ${user?.token}`,
            },
          }
        );

        /* REFRESH UI */

        setUsers(

          users.filter(
            (u) => u._id !== id
          )
        );

      } catch (err) {

        console.log(err);
      }
    };

  return (

    <div
      className="
        flex
        bg-[#020817]
        min-h-screen
      "
    >

      {/* ================= SIDEBAR ================= */}

      <AdminSidebar />

      {/* ================= CONTENT ================= */}

      <div
        className="
          flex-1
          p-10
          admin-fade
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-10
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-cyan-500/20

              flex
              items-center
              justify-center
            "
          >

            <Users
              size={32}
              className="
                admin-text-cyan
              "
            />
          </div>

          <div>

            <h1
              className="
                text-5xl
                font-black
                admin-page-title
              "
            >
              Participants
            </h1>

            <p
              className="
                admin-text-muted
                mt-2
              "
            >
              Manage all registered users
            </p>
          </div>
        </div>

        {/* ================= TABLE CARD ================= */}

        <div
          className="
            admin-card
            rounded-3xl
            overflow-hidden
          "
        >

          {/* ================= TABLE HEADER ================= */}

          <div
            className="
              px-8
              py-6
              border-b
              border-slate-800

              flex
              items-center
              justify-between
            "
          >

            <h2
              className="
                text-2xl
                font-black
                admin-page-title
              "
            >
              Participants List
            </h2>

            <div
              className="
                bg-cyan-500/20
                admin-text-cyan

                px-5
                py-2
                rounded-xl

                font-bold
              "
            >
              {users.length} Users
            </div>
          </div>

          {/* ================= LOADING ================= */}

          {loading ? (

            <div
              className="
                p-10
                text-center
                admin-text-muted
              "
            >
              Loading users...
            </div>

          ) : (

            <table className="w-full">

              {/* ================= HEAD ================= */}

              <thead className="bg-[#0B1120]">

                <tr>

                  <th
                    className="
                      p-5
                      text-left
                      admin-text-muted
                    "
                  >
                    Name
                  </th>

                  <th
                    className="
                      p-5
                      text-left
                      admin-text-muted
                    "
                  >
                    Email
                  </th>

                  <th
                    className="
                      p-5
                      text-left
                      admin-text-muted
                    "
                  >
                    Attempts
                  </th>

                  <th
                    className="
                      p-5
                      text-left
                      admin-text-muted
                    "
                  >
                    Avg Score
                  </th>

                  <th
                    className="
                      p-5
                      text-left
                      admin-text-muted
                    "
                  >
                    Risk
                  </th>

                  <th
                    className="
                      p-5
                      text-left
                      admin-text-muted
                    "
                  >
                    Actions
                  </th>

                </tr>
              </thead>

              {/* ================= BODY ================= */}

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

                    {/* NAME */}

                    <td
                      className="
                        p-5
                        admin-text-white
                        font-semibold
                      "
                    >
                      {user.name}
                    </td>

                    {/* EMAIL */}

                    <td
                      className="
                        p-5
                        admin-text-muted
                      "
                    >
                      {user.email}
                    </td>

                    {/* ATTEMPTS */}

                    <td
                      className="
                        p-5
                        admin-text-cyan
                        font-bold
                      "
                    >
                      {user.attempts}
                    </td>

                    {/* AVG SCORE */}

                    <td
                      className="
                        p-5
                        text-green-400
                        font-bold
                      "
                    >
                      {user.avgScore}%
                    </td>

                    {/* RISK */}

                    <td className="p-5">

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-xl

                          text-sm
                          font-bold

                          ${
                            user.risk === 'High'

                              ? `
                                bg-red-500/20
                                text-red-400
                              `

                              : user.risk === 'Medium'

                              ? `
                                bg-yellow-500/20
                                text-yellow-400
                              `

                              : `
                                bg-green-500/20
                                text-green-400
                              `
                          }
                        `}
                      >
                        {user.risk}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="p-5">

                      <div className="flex gap-3">

                        {/* VIEW */}

                        <Link
                          to={`/admin/users/${user._id}`}

                          className="
                            flex
                            items-center
                            gap-2

                            bg-cyan-500/20
                            text-cyan-400

                            px-4
                            py-2

                            rounded-xl

                            hover:bg-cyan-500
                            hover:text-white

                            transition-all
                          "
                        >

                          <Eye size={16} />

                          View
                        </Link>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            deleteUser(
                              user._id
                            )
                          }

                          className="
                            flex
                            items-center
                            gap-2

                            bg-red-500/20
                            text-red-400

                            px-4
                            py-2

                            rounded-xl

                            hover:bg-red-500
                            hover:text-white

                            transition-all
                          "
                        >

                          <Trash2 size={16} />

                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;