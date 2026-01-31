import { DashboardLayout } from "@/components/dashboards/dashboard-layout";
import { EmployeesClient } from "./employees-client";
import { getEmployees } from "./actions";

export default async function EmployeesPage() {
  const result = await getEmployees();
  const employees = result.success ? result.data : [];

  return (
    <DashboardLayout title="Employees">
      <EmployeesClient initialEmployees={employees ?? []} />
    </DashboardLayout>
  );
}