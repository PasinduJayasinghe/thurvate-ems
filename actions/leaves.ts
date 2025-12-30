"use server";

import { db } from "@/lib/supabase/db";
import { revalidatePath } from "next/cache";

export async function getLeaves() {
    try {
        const leaves = await db.leave.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                employee: true, // Join employee details
            },
        });
        return { success: true, data: leaves };
    } catch (error) {
        return { success: false, error: "Failed to fetch leaves" };
    }
}

export async function createLeave(data: any) {
    try {
        const leave = await db.leave.create({
            data: {
                employeeId: data.employeeId,
                type: data.type,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                reason: data.reason,
                status: "Pending",
            },
        });
        revalidatePath("/");
        return { success: true, data: leave };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create leave request" };
    }
}

export async function updateLeaveStatus(id: string, status: string) {
    try {
        await db.leave.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update leave status" };
    }
}
