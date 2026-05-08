import React from 'react';

const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  color,
}) => {

  return (

    <div
      className="
        bg-[#131C31]
        border
        border-slate-800

        rounded-3xl
        p-6

        flex
        justify-between
        items-center

        hover:border-cyan-500/50
        hover:shadow-lg

        transition-all
      "
    >

      {/* ================= LEFT CONTENT ================= */}

      <div>

        {/* TITLE */}

        <p
          className="
            text-slate-400
            text-sm
            uppercase
            tracking-widest
          "
        >
          {title}
        </p>

        {/* VALUE */}

        <h2
          className="
            text-5xl
            font-black
            admin-text-cyan
            mt-3
          "
        >
          {value}
        </h2>
      </div>

      {/* ================= ICON BOX ================= */}

      <div
        className="
          w-16
          h-16

          rounded-2xl

          flex
          items-center
          justify-center
        "

        style={{
          background: `${color}22`,
        }}
      >

        <Icon
          size={30}
          color={color}
        />

      </div>
    </div>
  );
};

export default AdminStatCard;