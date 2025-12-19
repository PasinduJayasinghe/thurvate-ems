import { DashboardLayout } from "@/components/dashboards/dashboard-layout";
import { StatsCard } from "@/components/dashboards/stats-card";
import { EmployeeTable } from "@/components/dashboards/employee-table";
import { RecentActivity } from "@/components/dashboards/recent-activity";
import { Users, UserCheck, CalendarClock, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Employees"
            value={0}
            description="Across all departments"
            icon={Users}
          />
          <StatsCard
            title="Active Employees"
            value={0}
            description="Currently working"
            icon={UserCheck}
          />
          <StatsCard
            title="Leave Requests"
            value={0}
            description="Pending approval"
            icon={CalendarClock}
          />
          <StatsCard
            title="Monthly Payroll"
            value="$0"
            description="December 2024"
            icon={DollarSign}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Employee Table */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Recent Employees</h2>
            <EmployeeTable employees={[]} />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity activities={[]} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
