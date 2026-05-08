import React, {
  useEffect,
  useState,
} from 'react';

import {
  Activity,
  Brain,
  ShieldAlert,
} from 'lucide-react';

import AdminSidebar from '../components/AdminSidebar';

const AnalyticsPage = () => {

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        const res = await fetch(
          'http://localhost:5000/api/admin/analytics',
          {
            headers: {
              Authorization:
                `Bearer ${user?.token}`,
            },
          }
        );

        const data =
          await res.json();

        setAnalytics(data);

      } catch (err) {

        console.log(err);
      }
    };

  if (!analytics) {

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

        {/* ================= PAGE TITLE ================= */}

        <h1
          className="
            text-5xl
            font-black
            admin-page-title
            mb-10
          "
        >
          Analytics
        </h1>

        {/* ================= TOP CARDS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {/* TOTAL ATTEMPTS */}

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
                  {analytics.totalAttempts}
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
                  Avg Score
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    text-green-400
                    mt-3
                  "
                >
                  {analytics.averageScore}%
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

          {/* HIGH RISK */}

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
                  High Risk
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    text-red-400
                    mt-3
                  "
                >
                  {analytics.highRisk}
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

        {/* ================= OVERVIEW ================= */}

        <div
          className="
            mt-10
            admin-card
            p-10
          "
        >

          <h2
            className="
              text-3xl
              font-black
              admin-page-title
              mb-8
            "
          >
            Cognitive Overview
          </h2>

          <div className="space-y-8">

            {/* AVG HEALTH */}

            <div>

              <div
                className="
                  flex
                  justify-between
                  mb-3
                "
              >

                <span className="admin-text-muted">
                  Average Cognitive Health
                </span>

                <span className="admin-text-white">
                  {analytics.averageScore}%
                </span>
              </div>

              <div
                className="
                  h-4
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
                      `${analytics.averageScore}%`,
                  }}
                />
              </div>
            </div>

            {/* RISK POPULATION */}

            <div>

              <div
                className="
                  flex
                  justify-between
                  mb-3
                "
              >

                <span className="admin-text-muted">
                  Risk Population
                </span>

                <span className="text-red-400 font-bold">
                  {analytics.highRisk}
                </span>
              </div>

              <div
                className="
                  h-4
                  rounded-full
                  bg-[#0B1120]
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    bg-red-500
                  "
                  style={{
                    width:
                      `${
                        analytics.totalAttempts > 0
                          ? (
                              analytics.highRisk /
                              analytics.totalAttempts
                            ) * 100
                          : 0
                      }%`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;