export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
  joinDate: string;
}
