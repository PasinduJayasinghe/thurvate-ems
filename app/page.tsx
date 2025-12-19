import { DashboardLayout } from "@/components/dashboards/dashboard-layout";
import { StatsCard } from "@/components/dashboards/stats-card";
import { EmployeeTable } from "@/components/dashboards/employee-table";
import { RecentActivity } from "@/components/dashboards/recent-activity";
import { Users, UserCheck, CalendarClock, DollarSign } from "lucide-react";
import type { Employee } from "@/types/employee";

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@thurvate.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@thurvate.com",
    role: "Product Manager",
    department: "Product",
    status: "active",
    joinDate: "2023-06-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@thurvate.com",
    role: "UI/UX Designer",
    department: "Design",
    status: "on-leave",
    joinDate: "2024-03-10",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@thurvate.com",
    role: "HR Manager",
    department: "Human Resources",
    status: "active",
    joinDate: "2022-11-05",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@thurvate.com",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "inactive",
    joinDate: "2023-09-01",
  },
];

const mockActivities = [
  {
    id: "1",
    user: { name: "John Doe" },
    action: "Submitted leave request for Dec 25-27",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: { name: "Jane Smith" },
    action: "Updated project milestones",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    user: { name: "Sarah Williams" },
    action: "Added new employee to the system",
    timestamp: "Yesterday",
  },
  {
    id: "4",
    user: { name: "Mike Johnson" },
    action: "Completed onboarding training",
    timestamp: "2 days ago",
  },
];

export default function Home() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Employees"
            value={156}
            description="Across all departments"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Employees"
            value={142}
            description="Currently working"
            icon={UserCheck}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Leave Requests"
            value={8}
            description="Pending approval"
            icon={CalendarClock}
          />
          <StatsCard
            title="Monthly Payroll"
            value="$285,000"
            description="December 2024"
            icon={DollarSign}
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Employee Table */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Recent Employees</h2>
            <EmployeeTable employees={mockEmployees} />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity activities={mockActivities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
