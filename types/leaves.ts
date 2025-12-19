export interface LeaveRequest {
  id: string;
  employee_id: string;
  employeeName: string;
  leaveType: "annual" | "sick" | "personal" | "unpaid";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}