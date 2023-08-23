import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicFacultySearchableFields } from './academicFaculty.const';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';

const insertIntoDb = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};
const getAllData = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  console.log(filterData, AcademicFacultySearchableFields);
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

  if (searchTerm) {
    andCondition.push({
      OR: AcademicFacultySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicFaculty.findMany({
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
  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getDataById = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicFacultyService = {
  insertIntoDb,
  getAllData,
  getDataById,
};
