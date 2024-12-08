import { useEffect, useState } from "react";
import { getStats } from "../lib/api";

const MetricCard = ({ title, value, icon }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-2 text-2xl font-semibold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        console.log("/////", response);
        setStats(response);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats(null); // Ensure stats is null on error
      }
    };
    fetchStats();
  }, []);

  // Define metrics using API data if available, or fallback values
  const metrics = [
    {
      title: "Total Leads",
      value: stats?.totalLeads ?? "N/A",
      icon: "📊",
    },
    {
      title: "New Leads",
      value: stats?.newLeads ?? "N/A",
      icon: "🆕",
    },
    {
      title: "Converted Leads",
      value: stats?.convertedLeads ?? "N/A",
      icon: "✅",
    },
    {
      title: "Pending Follow-ups",
      value: stats?.pendingFollowUps ?? "N/A",
      icon: "⏳",
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
