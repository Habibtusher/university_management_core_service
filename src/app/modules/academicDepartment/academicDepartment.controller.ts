import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentFilterableFields } from './academicDepartment.const';
import { AcademicDepartmentService } from './academicDepartment.service';

const insertntoDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicDepartmentService.insertIntoDb(
    academicSemesterData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department created successfully!',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicDepartmentFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department retrived successfully!',
    data: result.data,
    meta: result.meta,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicDepartmentService.getDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department retrived successfully!',
    data: result,
  });
});
// const uniqueSemester = catchAsync(async (req: Request, res: Response) => {
//   console.log('hello babes');
//   const result = await AcademicSemesterService.uniqueSemester();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'unique department retrived successfully!',
//     data: result,
//   });
// });

export const AcademicDepartmentController = {
  insertntoDb,
  getAllData,
  getDataById,
};
