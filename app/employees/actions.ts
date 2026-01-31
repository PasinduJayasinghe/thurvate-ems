"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type EmployeeFormData = {
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive" | "on-leave";
    avatar?: string;
    joinDate: string;
    phone?: string;
};

// Get all employees
export async function getEmployees() {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: employees };
    } catch (error) {
        console.error("Failed to fetch employees:", error);
        return { success: false, error: "Failed to fetch employees" };
    }
}

// Get single employee by ID
export async function getEmployee(id: string) {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id },
        });
        if (!employee) {
            return { success: false, error: "Employee not found" };
        }
        return { success: true, data: employee };
    } catch (error) {
        console.error("Failed to fetch employee:", error);
        return { success: false, error: "Failed to fetch employee" };
    }
}

// Create employee
export async function createEmployee(data: EmployeeFormData) {
    try {
        const employee = await prisma.employee.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role,
                department: data.department,
                status: data.status,
                avatar: data.avatar,
                joinDate: new Date(data.joinDate),
                phone: data.phone,
            },
        });
        revalidatePath("/employees");
        revalidatePath("/");
        return { success: true, data: employee };
    } catch (error) {
        console.error("Failed to create employee:", error);
        return { success: false, error: "Failed to create employee" };
    }
}

// Update employee
export async function updateEmployee(id: string, data: Partial<EmployeeFormData>) {
    try {
        const updateData: Record<string, unknown> = { ...data };
        if (data.joinDate) {
            updateData.joinDate = new Date(data.joinDate);
        }

        const employee = await prisma.employee.update({
            where: { id },
            data: updateData,
        });
        revalidatePath("/employees");
        revalidatePath("/");
        return { success: true, data: employee };
    } catch (error) {
        console.error("Failed to update employee:", error);
        return { success: false, error: "Failed to update employee" };
    }
}

// Delete employee
export async function deleteEmployee(id: string) {
    try {
        await prisma.employee.delete({
            where: { id },
        });
        revalidatePath("/employees");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete employee:", error);
        return { success: false, error: "Failed to delete employee" };
    }
}
