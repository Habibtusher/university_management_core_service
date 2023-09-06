/*
  Warnings:

  - The primary key for the `CourseToPrerequisite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `prereqCourseId` on the `CourseToPrerequisite` table. All the data in the column will be lost.
  - You are about to drop the `tests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `preRequisiteId` to the `CourseToPrerequisite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_prereqCourseId_fkey";

-- AlterTable
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_pkey",
DROP COLUMN "prereqCourseId",
ADD COLUMN     "preRequisiteId" TEXT NOT NULL,
ADD CONSTRAINT "CourseToPrerequisite_pkey" PRIMARY KEY ("courseId", "preRequisiteId");

-- DropTable
DROP TABLE "tests";

-- AddForeignKey
ALTER TABLE "CourseToPrerequisite" ADD CONSTRAINT "CourseToPrerequisite_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
