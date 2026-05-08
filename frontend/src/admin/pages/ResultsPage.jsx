import React, { useEffect, useState } from 'react';

import AdminSidebar from '../components/AdminSidebar';

const ResultsPage = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const res = await fetch(
      'http://localhost:5000/api/admin/results',
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    const data = await res.json();

    setResults(data);
  };

  return (
    <div className="flex bg-[#020817] min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-black text-white mb-10">
          Test Attempts
        </h1>

        <div className="space-y-5">

          {results.map((result) => (

            <div
              key={result._id}
              className="
                bg-[#131C31]
                border
                border-slate-800
                rounded-3xl
                p-6
              "
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {result.userName}
                  </h2>

                  <p className="text-slate-400 mt-1">
                    {result.testId}
                  </p>

                </div>

                <div className="text-right">

                  <h3 className="text-4xl font-black text-cyan-400">
                    {Math.round(
                      (result.finalScore /
                        result.maxScore) *
                        100
                    )}
                    %
                  </h3>

                  <p className="text-slate-400">
                    Score
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ResultsPage;