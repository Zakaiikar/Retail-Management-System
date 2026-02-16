import AppLayout from "../../components/AppLayout";

export default function AdminDashboard() {
  return (
    <AppLayout role="admin" title="Admin Dashboard">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard title="Total Sales" value="$0.00" />
        <StatCard title="Total Products" value="0" />
        <StatCard title="Employees" value="0" />

      </div>

    </AppLayout>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
