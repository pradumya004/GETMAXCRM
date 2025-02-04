import React from "react";

const DashboardContent = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
      <p className="mt-4 text-lg">
        Welcome to your dashboard. Here you can get an overview of your
        products, organization, and activity.
      </p>

      {/* Add more content like cards, charts, etc. */}
      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold">Product Stats</h3>
          <p>Product count, sales data, etc.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold">Income</h3>
          <p>Total income, pending payments, etc.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold">Organisation</h3>
          <p>Team stats, new joiners, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
