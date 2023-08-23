import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();
router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.insertntoDb
);
router.get('/', AcademicFacultyController.getAllData);
router.get('/:id', AcademicFacultyController.getDataById);
export const AcademicFacultyRoutes = router;
