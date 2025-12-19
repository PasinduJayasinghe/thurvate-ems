import type { Employee } from "./employee";
import type { LucideIcon } from "lucide-react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export interface EmployeeTableProps {
  employees: Employee[];
}

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  timestamp: string;
}

export interface RecentActivityProps {
  activities: Activity[];
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface TopbarProps {
  title?: string;
}