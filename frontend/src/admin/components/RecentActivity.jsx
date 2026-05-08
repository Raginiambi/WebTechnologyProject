import React from 'react';

import {
  Brain,
  Activity,
  AlertTriangle,
} from 'lucide-react';

const RecentActivity = ({ activities = [] }) => {

  const getIcon = (type) => {
    switch (type) {
      case 'test':
        return <Brain size={18} />;

      case 'risk':
        return <AlertTriangle size={18} />;

      default:
        return <Activity size={18} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'test':
        return 'text-cyan-400 bg-cyan-500/10';

      case 'risk':
        return 'text-red-400 bg-red-500/10';

      default:
        return 'text-purple-400 bg-purple-500/10';
    }
  };

  return (
    <div
      className="
        bg-[#131C31]
        border
        border-slate-800
        rounded-3xl
        p-6
      "
    >

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-black text-white">
            Recent Activity
          </h2>

          <p className="text-slate-400 mt-1">
            Live participant activity feed
          </p>
        </div>

        <div
          className="
            w-3
            h-3
            rounded-full
            bg-green-400
            animate-pulse
          "
        />
      </div>

      <div className="space-y-5">

        {activities.length === 0 && (
          <div
            className="
              text-center
              text-slate-500
              py-10
            "
          >
            No recent activity
          </div>
        )}

        {activities.map((activity, index) => (
          <div
            key={index}
            className="
              flex
              items-start
              gap-4
              p-4
              rounded-2xl
              bg-[#0B1120]
              border
              border-slate-800
              hover:border-cyan-500/30
              transition-all
            "
          >

            <div
              className={`
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                ${getColor(activity.type)}
              `}
            >
              {getIcon(activity.type)}
            </div>

            <div className="flex-1">

              <h3 className="text-white font-semibold">
                {activity.title}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {activity.description}
              </p>

              <span className="text-xs text-slate-500 mt-2 block">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;