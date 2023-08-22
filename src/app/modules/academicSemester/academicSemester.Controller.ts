import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterableFields } from './academicSemester.const';
import { AcademicSemesterService } from './academicSemesterService.ts';

const insertntoDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.insertIntoDb(
    academicSemesterData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully!',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester retrived successfully!',
    data: result.data,
    meta: result.meta,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.getDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester retrived successfully!',
    data: result,
  });
});
const uniqueSemester = catchAsync(async (req: Request, res: Response) => {
  console.log('hello babes');
  const result = await AcademicSemesterService.uniqueSemester();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'unique semester retrived successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertntoDb,
  getAllData,
  getDataById,
  uniqueSemester,
};
