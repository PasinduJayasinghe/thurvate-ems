"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { Employee } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface EmployeeTableProps {
  employees: Employee[];
  selectedId?: string | null;
  onSelectEmployee?: (id: string | null) => void;
}

function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "on-leave":
      return "outline";
    default:
      return "default";
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function EmployeeTable({ employees, selectedId, onSelectEmployee }: EmployeeTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No employees found.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow
                key={employee.id}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedId === employee.id && "bg-muted"
                )}
                onClick={() => onSelectEmployee?.(selectedId === employee.id ? null : employee.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={employee.avatar ?? undefined} alt={employee.name} />
                      <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(employee.status)}>
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(employee.joinDate), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
