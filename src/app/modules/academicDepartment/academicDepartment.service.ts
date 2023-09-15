import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicDepartmentSearchableFields, academicDepartmentRelationalFields, academicDepartmentRelationalFieldsMapper } from './academicDepartment.const';
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

  const andConditions = [];
 
  if (searchTerm) {
    andConditions.push({
        OR: AcademicDepartmentSearchableFields.map((field) => ({
            [field]: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        }))
    });
}

if (Object.keys(filterData).length > 0) {
    andConditions.push({
        AND: Object.keys(filterData).map((key) => {
            if (academicDepartmentRelationalFields.includes(key)) {
                return {
                    [academicDepartmentRelationalFieldsMapper[key]]: {
                        id: (filterData as any)[key]
                    }
                };
            } else {
                return {
                    [key]: {
                        equals: (filterData as any)[key]
                    }
                };
            }
        })
    });
}
  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
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
