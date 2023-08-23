import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicDepartmentSearchableFields } from './academicDepartment.const';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const insertIntoDb = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academiFaculty: true,
    },
  });
  return result;
};

const getAllData = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (Object.keys(filterData).length) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  console.log(filterData);

  if (searchTerm) {
    andCondition.push({
      OR: AcademicDepartmentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicDepartment.findMany({
    include: {
      academiFaculty: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.academicDepartment.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getDataById = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    include: {
      academiFaculty: true,
    },
    where: {
      id,
    },
  });
  return result;
};
// const uniqueSemester = async () => {
//   const result = await prisma.academicSemester.findMany({
//     select: {
//       id: true,
//       code: true,
//       title: true,
//     },
//     distinct: ['title'], // This will fetch distinct semester values
//   });
//   return result;
// };
export const AcademicDepartmentService = {
  insertIntoDb,
  getAllData,
  getDataById,
};
