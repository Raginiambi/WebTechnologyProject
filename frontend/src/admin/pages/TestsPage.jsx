import React, {
  useEffect,
  useState,
} from 'react';

import {
  Brain,
  Activity,
  BarChart3,
} from 'lucide-react';

import AdminSidebar from '../components/AdminSidebar';

const TestsPage = () => {

  const [tests, setTests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadTests();

  }, []);

  const loadTests =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        const res = await fetch(
          'http://localhost:5000/api/admin/tests',
          {
            headers: {
              Authorization:
                `Bearer ${user?.token}`,
            },
          }
        );

        const data =
          await res.json();

        setTests(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
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

            <Brain
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
              Test Modules
            </h1>

            <p
              className="
                admin-text-muted
                mt-2
              "
            >
              Cognitive test analytics
              and performance overview
            </p>
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (

          <div
            className="
              admin-card
              p-10
              text-center
              admin-text-muted
            "
          >
            Loading test modules...
          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {tests.map((test) => (

              <div
                key={test.testId}

                className="
                  admin-card
                  admin-card-hover

                  rounded-3xl
                  p-6
                "
              >

                {/* ================= TOP ================= */}

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mb-6
                  "
                >

                  {/* ICON */}

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

                    <Brain
                      className="
                        admin-text-cyan
                      "
                      size={30}
                    />
                  </div>

                  {/* ANALYTICS ICON */}

                  <BarChart3
                    className="
                      text-purple-400
                    "
                    size={28}
                  />
                </div>

                {/* ================= TEST NAME ================= */}

                <h2
                  className="
                    text-3xl
                    font-black
                    admin-page-title
                    mb-6
                  "
                >
                  {test.testId}
                </h2>

                {/* ================= STATS ================= */}

                <div className="space-y-4">

                  {/* ATTEMPTS */}

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span
                      className="
                        admin-text-muted
                      "
                    >
                      Attempts
                    </span>

                    <span
                      className="
                        admin-text-cyan
                        font-bold
                        text-lg
                      "
                    >
                      {test.attempts}
                    </span>
                  </div>

                  {/* AVG SCORE */}

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span
                      className="
                        admin-text-muted
                      "
                    >
                      Avg Score
                    </span>

                    <span
                      className="
                        text-green-400
                        font-bold
                        text-lg
                      "
                    >
                      {test.avgScore}%
                    </span>
                  </div>

                  {/* PROGRESS BAR */}

                  <div className="pt-4">

                    <div
                      className="
                        h-3
                        rounded-full
                        bg-[#0B1120]
                        overflow-hidden
                      "
                    >

                      <div
                        className="
                          h-full
                          bg-cyan-500
                        "

                        style={{
                          width:
                            `${test.avgScore}%`,
                        }}
                      />
                    </div>
                  </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div
                  className="
                    mt-6
                    pt-5
                    border-t
                    border-slate-800

                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      admin-text-muted
                      text-sm
                    "
                  >

                    <Activity size={16} />

                    Live Analytics
                  </div>

                  <div
                    className="
                      bg-cyan-500/20
                      admin-text-cyan

                      px-3
                      py-1

                      rounded-lg

                      text-sm
                      font-bold
                    "
                  >
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPage;