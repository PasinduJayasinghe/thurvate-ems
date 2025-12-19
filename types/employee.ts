export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
  joinDate: string;
  created_at?: string;
  updated_at?: string;
  phone?: string;
}
