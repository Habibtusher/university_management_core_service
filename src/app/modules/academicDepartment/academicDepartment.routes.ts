import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.insertntoDb
);
router.get('/', AcademicDepartmentController.getAllData);
// router.get('/unique', AcademicDepartmentController.uniqueSemester);
router.get('/:id', AcademicDepartmentController.getDataById);

export const AcademicDepartmentRoutes = router;
