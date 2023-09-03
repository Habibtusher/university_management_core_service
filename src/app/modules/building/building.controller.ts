import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BuildingFilterableFields } from './building.constant';
import { BuildingService } from './building.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await BuildingService.insertIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building created successfully!',
    data: result,
  });
});
const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BuildingFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BuildingService.getAllFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building retrived successfully!',
    data: result.data,
    meta: result.meta,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildingService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildingService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildingService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building delete successfully',
    data: result,
  });
});

export const BuildingController = {
  insertIntoDb,
  getAllFromDb,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
