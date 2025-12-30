"use server";

import { db } from "@/lib/supabase/db";
import { revalidatePath } from "next/cache";

export async function getEmployees() {
    try {
        const employees = await db.employee.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: employees };
    } catch (error) {
        return { success: false, error: "Failed to fetch employees" };
    }
}

export async function createEmployee(data: any) {
    try {
        const employee = await db.employee.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                department: data.department,
                position: data.position,
                joiningDate: new Date(data.joiningDate),
                salary: parseFloat(data.salary),
                status: data.status || "Active",
            },
        });
        revalidatePath("/");
        return { success: true, data: employee };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create employee" };
    }
}

export async function deleteEmployee(id: string) {
    try {
        await db.employee.delete({
            where: { id },
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete employee" };
    }
}
