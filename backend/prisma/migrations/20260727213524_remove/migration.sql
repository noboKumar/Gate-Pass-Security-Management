/*
  Warnings:

  - You are about to drop the column `employeeId` on the `EmployeeGatePass` table. All the data in the column will be lost.
  - You are about to drop the column `returnTime` on the `EmployeeGatePass` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "EmployeeGatePass_employeeId_key";

-- AlterTable
ALTER TABLE "EmployeeGatePass" DROP COLUMN "employeeId",
DROP COLUMN "returnTime",
ALTER COLUMN "exitTime" DROP NOT NULL;
