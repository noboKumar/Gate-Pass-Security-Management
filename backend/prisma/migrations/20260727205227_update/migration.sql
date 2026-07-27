/*
  Warnings:

  - You are about to drop the `GatePass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GatePassStatus" AS ENUM ('PENDING', 'APPROVED', 'RETURNED');

-- DropForeignKey
ALTER TABLE "GatePass" DROP CONSTRAINT "GatePass_hostId_fkey";

-- DropTable
DROP TABLE "GatePass";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "PassStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "company" TEXT,
    "purpose" TEXT NOT NULL,
    "personToMeet" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOut" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeGatePass" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "exitTime" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3),
    "status" "GatePassStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeGatePass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_mobile_key" ON "Visitor"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeGatePass_employeeId_key" ON "EmployeeGatePass"("employeeId");
