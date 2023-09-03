import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BuildingSearchableFields } from './building.constant';
import { IBuildingFilterRequest } from './building.interface';

const insertIntoDb =async (data:Building) :Promise<Building> => {
    const result = await prisma.building.create({
        data
    })
    return result
}

const getAllFromDb =async (filters:IBuildingFilterRequest,options:IPaginationOptions) :Promise<IGenericResponse<Building[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
          OR: BuildingSearchableFields.map(field => ({
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          })),
        });
      }
      const whereConditions: Prisma.BuildingWhereInput =
      andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.building.findMany({
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
              }
    })
    const total = await prisma.building.count();
    return {
        meta: {
          total,
          page,
          limit,
        },
        data: result,
      };
}

const getByIdFromDB = async (id: string): Promise<Building | null> => {
    const result = await prisma.building.findUnique({
        where: {
            id
        }
    });
   
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Building>): Promise<Building> => {
    const result = await prisma.building.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Building> => {
    const result = await prisma.building.delete({
        where: {
            id
        }
    });
    return result;
};
export const BuildingService = {
    insertIntoDb,
    getAllFromDb,
    getByIdFromDB,
    deleteByIdFromDB,
    updateOneInDB
}