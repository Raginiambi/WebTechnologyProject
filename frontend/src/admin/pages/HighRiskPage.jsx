import React, { useEffect, useState } from 'react';

import AdminSidebar from '../components/AdminSidebar';

const HighRiskPage = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const res = await fetch(
      'http://localhost:5000/api/admin/high-risk',
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    const data = await res.json();

    setUsers(data);
  };

  return (
    <div className="flex bg-[#020817] min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-black text-red-400 mb-10">
          High Risk Participants
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {users.map((u) => (

            <div
              key={u._id}
              className="
                bg-[#131C31]
                border
                border-red-500/30
                rounded-3xl
                p-6
              "
            >

              <h2 className="text-2xl font-bold text-white">
                {u.name}
              </h2>

              <p className="text-slate-400 mt-2">
                {u.email}
              </p>

              <div className="mt-5">

                <span
                  className="
                    bg-red-500/20
                    text-red-400
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  High Cognitive Risk
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default HighRiskPage;