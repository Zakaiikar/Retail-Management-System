import AppLayout from "../../components/AppLayout";

export default function EmployeeDashboard() {
  return (
    <AppLayout role="employee" title="Employee Dashboard">

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">
          POS Ready
        </h2>
        <p className="text-gray-500">
          Select products and process customer sales.
        </p>
      </div>

    </AppLayout>
  );
}
