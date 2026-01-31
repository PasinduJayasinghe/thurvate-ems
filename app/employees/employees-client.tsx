"use client";

import { useState, useTransition } from "react";
import { EmployeeTable } from "@/components/dashboards/employee-table";
import { EmployeeFormDialog } from "@/components/employees/employee-form-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search } from "lucide-react";
import { deleteEmployee, getEmployees } from "./actions";
import { toast } from "sonner";
import type { Employee } from "@/lib/prisma";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EmployeesClientProps {
    initialEmployees: Employee[];
}

export function EmployeesClient({ initialEmployees }: EmployeesClientProps) {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function refreshEmployees() {
        const result = await getEmployees();
        if (result.success && result.data) {
            setEmployees(result.data);
        }
    }

    async function handleDelete() {
        if (!selectedId) return;

        startTransition(async () => {
            const result = await deleteEmployee(selectedId);
            if (result.success) {
                toast.success("Employee deleted successfully");
                setSelectedId(null);
                await refreshEmployees();
            } else {
                toast.error(result.error || "Failed to delete employee");
            }
        });
    }

    return (
        <div className="space-y-6">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <EmployeeFormDialog onSuccess={refreshEmployees} />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="text-destructive"
                                disabled={!selectedId || isPending}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this employee? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* Search */}
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search employees..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Employee Table */}
            <EmployeeTable
                employees={filteredEmployees}
                selectedId={selectedId}
                onSelectEmployee={setSelectedId}
            />
        </div>
    );
}
