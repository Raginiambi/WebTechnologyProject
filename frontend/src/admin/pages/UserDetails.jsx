import React, {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import {
  Mail,
  Activity,
  ShieldAlert,
  Brain,
} from 'lucide-react';

import AdminSidebar from '../components/AdminSidebar';

const UserDetails = () => {

  const { id } =
    useParams();

  const [userData, setUserData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadUser();

  }, []);

  const loadUser =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        const res = await fetch(
          `http://localhost:5000/api/admin/users/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${user?.token}`,
            },
          }
        );

        const data =
          await res.json();

        setUserData(data);

        setLoading(false);

      } catch (err) {

        console.log(err);

        setLoading(false);
      }
    };

  if (loading) {

    return (

      <div
        className="
          text-white
          p-10
        "
      >
        Loading...
      </div>
    );
  }

  if (!userData) {

    return (

      <div
        className="
          text-white
          p-10
        "
      >
        No user found
      </div>
    );
  }

  const { user, results } =
    userData;

  let average = 0;

  if (results.length > 0) {

    average = Math.round(

      results.reduce(
        (acc, curr) =>

          acc +

          (
            curr.finalScore /
            curr.maxScore
          ) * 100,

        0
      ) / results.length
    );
  }

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

        {/* ================= USER HEADER ================= */}

        <div
          className="
            admin-card
            p-8
            mb-10
          "
        >

          <div
            className="
              flex
              items-center
              gap-6
            "
          >

            {/* AVATAR */}

            <div
              className="
                w-24
                h-24
                rounded-3xl
                bg-cyan-500/20

                flex
                items-center
                justify-center

                admin-text-cyan

                text-4xl
                font-black
              "
            >
              {user.name?.charAt(0)}
            </div>

            {/* USER INFO */}

            <div>

              <h1
                className="
                  text-5xl
                  font-black
                  admin-page-title
                "
              >
                {user.name}
              </h1>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  admin-text-muted
                  mt-3
                "
              >

                <Mail size={18} />

                {user.email}

              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mb-10
          "
        >

          {/* ATTEMPTS */}

          <div
            className="
              admin-card
              admin-card-hover
              p-6
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <div>

                <p className="admin-text-muted">
                  Total Attempts
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    admin-text-white
                    mt-3
                  "
                >
                  {results.length}
                </h2>
              </div>

              <Activity
                className="
                  admin-text-cyan
                "
                size={40}
              />
            </div>
          </div>

          {/* AVG SCORE */}

          <div
            className="
              admin-card
              admin-card-hover
              p-6
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <div>

                <p className="admin-text-muted">
                  Average Score
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    text-green-400
                    mt-3
                  "
                >
                  {average}%
                </h2>
              </div>

              <Brain
                className="
                  text-purple-400
                "
                size={40}
              />
            </div>
          </div>

          {/* RISK */}

          <div
            className="
              admin-card
              admin-card-hover
              p-6
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <div>

                <p className="admin-text-muted">
                  Risk Level
                </p>

                <h2
                  className={`
                    text-5xl
                    font-black
                    mt-3

                    ${
                      average < 40

                        ? 'text-red-400'

                        : average < 70

                        ? 'text-yellow-400'

                        : 'admin-text-cyan'
                    }
                  `}
                >
                  {
                    average < 40

                      ? 'HIGH'

                      : average < 70

                      ? 'MED'

                      : 'LOW'
                  }
                </h2>
              </div>

              <ShieldAlert
                className="
                  text-red-400
                "
                size={40}
              />
            </div>
          </div>
        </div>

        {/* ================= TEST HISTORY ================= */}

        <div
          className="
            admin-card
            overflow-hidden
          "
        >

          {/* HEADER */}

          <div
            className="
              p-6
              border-b
              border-slate-800
            "
          >

            <h2
              className="
                text-3xl
                font-black
                admin-page-title
              "
            >
              Test History
            </h2>
          </div>

          {/* TABLE */}

          <table className="w-full">

            <thead className="bg-[#0B1120]">

              <tr>

                <th
                  className="
                    p-5
                    text-left
                    admin-text-muted
                  "
                >
                  Test
                </th>

                <th
                  className="
                    p-5
                    text-left
                    admin-text-muted
                  "
                >
                  Score
                </th>

                <th
                  className="
                    p-5
                    text-left
                    admin-text-muted
                  "
                >
                  Percentage
                </th>

                <th
                  className="
                    p-5
                    text-left
                    admin-text-muted
                  "
                >
                  Date
                </th>

              </tr>
            </thead>

            <tbody>

              {results.map((r) => {

                const percentage =
                  Math.round(
                    (
                      r.finalScore /
                      r.maxScore
                    ) * 100
                  );

                return (

                  <tr
                    key={r._id}

                    className="
                      border-t
                      border-slate-800
                      hover:bg-[#0B1120]
                      transition-all
                    "
                  >

                    {/* TEST */}

                    <td
                      className="
                        p-5
                        admin-text-white
                      "
                    >
                      {r.testId}
                    </td>

                    {/* SCORE */}

                    <td
                      className="
                        p-5
                        admin-text-cyan
                      "
                    >
                      {r.finalScore}
                      /
                      {r.maxScore}
                    </td>

                    {/* PERCENTAGE */}

                    <td
                      className="
                        p-5
                        text-green-400
                        font-bold
                      "
                    >
                      {percentage}%
                    </td>

                    {/* DATE */}

                    <td
                      className="
                        p-5
                        admin-text-muted
                      "
                    >
                      {
                        new Date(
                          r.createdAt
                        ).toLocaleString()
                      }
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;