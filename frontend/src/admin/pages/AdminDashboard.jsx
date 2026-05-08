// import React, { useEffect, useState } from 'react';

// import {
//   Users,
//   Brain,
//   Activity,
//   ShieldAlert,
// } from 'lucide-react';

// import { useNavigate } from 'react-router-dom';
// import AdminSidebar from '../components/AdminSidebar';
// import AdminStatCard from '../components/AdminStatCard';

// import { getDashboardStats } from '../utils/adminApi';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTests: 0,
//     attempts: 0,
//     highRisk: 0,
//   });
// const navigate = useNavigate();
//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const data = await getDashboardStats();
//       setStats(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex bg-[#020817] min-h-screen">

//       <AdminSidebar />

//       <div className="flex-1 p-10">

//         <h1 className="text-5xl font-black admin-page-title mb-10">
//   Dashboard Overview
// </h1>

//        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

//   <div
//     onClick={() => navigate('/admin/users')}
//     className="cursor-pointer"
//   >
//     <AdminStatCard
//       title="Participants"
//       value={stats.totalUsers}
//       icon={Users}
//       color="#06B6D4"
//     />
//   </div>

//   <div
//     onClick={() => navigate('/admin/tests')}
//     className="cursor-pointer"
//   >
//     <AdminStatCard
//       title="Tests"
//       value={stats.totalTests}
//       icon={Brain}
//       color="#A855F7"
//     />
//   </div>

//   <div
//     onClick={() => navigate('/admin/results')}
//     className="cursor-pointer"
//   >
//     <AdminStatCard
//       title="Attempts"
//       value={stats.attempts}
//       icon={Activity}
//       color="#10B981"
//     />
//   </div>

//   <div
//     onClick={() => navigate('/admin/high-risk')}
//     className="cursor-pointer"
//   >
//     <AdminStatCard
//       title="High Risk"
//       value={stats.highRisk}
//       icon={ShieldAlert}
//       color="#EF4444"
//     />
//   </div>

// </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Users,
  Brain,
  Activity,
  ShieldAlert,
} from 'lucide-react';

import {
  useNavigate,
} from 'react-router-dom';

import AdminSidebar from '../components/AdminSidebar';

import AdminStatCard from '../components/AdminStatCard';

import {
  getDashboardStats,
} from '../utils/adminApi';

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalTests: 0,
      attempts: 0,
      highRisk: 0,
    });

  const navigate =
    useNavigate();

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const data =
          await getDashboardStats();

        setStats(data);

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

        {/* ================= PAGE TITLE ================= */}

        <h1
          className="
            text-5xl
            font-black
            admin-page-title
            mb-10
          "
        >
          Dashboard Overview
        </h1>

        {/* ================= STATS GRID ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          {/* ================= PARTICIPANTS ================= */}

          <div
            onClick={() =>
              navigate('/admin/users')
            }

            className="
              cursor-pointer
              admin-card-hover
            "
          >

            <AdminStatCard
              title="Participants"

              value={stats.totalUsers}

              icon={Users}

              color="#06B6D4"
            />
          </div>

          {/* ================= TESTS ================= */}

          <div
            onClick={() =>
              navigate('/admin/tests')
            }

            className="
              cursor-pointer
              admin-card-hover
            "
          >

            <AdminStatCard
              title="Tests"

              value={stats.totalTests}

              icon={Brain}

              color="#A855F7"
            />
          </div>

          {/* ================= ATTEMPTS ================= */}

          <div
            onClick={() =>
              navigate('/admin/results')
            }

            className="
              cursor-pointer
              admin-card-hover
            "
          >

            <AdminStatCard
              title="Attempts"

              value={stats.attempts}

              icon={Activity}

              color="#10B981"
            />
          </div>

          {/* ================= HIGH RISK ================= */}

          <div
            onClick={() =>
              navigate('/admin/high-risk')
            }

            className="
              cursor-pointer
              admin-card-hover
            "
          >

            <AdminStatCard
              title="High Risk"

              value={stats.highRisk}

              icon={ShieldAlert}

              color="#EF4444"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;