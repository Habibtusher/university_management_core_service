import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyFilterableFields } from './academicFaculty.const';
import { AcademicFacultyService } from './academicFaculty.service';

const insertntoDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.insertIntoDb(academicFacultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty created successfully!',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicFacultyFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty retrived successfully!',
    data: result.data,
    meta: result.meta,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.getDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty retrived successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  insertntoDb,
  getAllData,
  getDataById,
};
