import { PrismaClient, Prisma } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Derive types from Prisma client using the payload inference pattern
type EmployeePayload = Prisma.EmployeeGetPayload<object>;
type LeaveRequestPayload = Prisma.LeaveRequestGetPayload<object>;

// Re-export types for convenience
export type Employee = EmployeePayload;
export type LeaveRequest = LeaveRequestPayload;
