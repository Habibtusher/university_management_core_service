import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.insertntoDb
);
router.get('/', AcademicDepartmentController.getAllData);
// router.get('/unique', AcademicDepartmentController.uniqueSemester);
router.get('/:id', AcademicDepartmentController.getDataById);

export const AcademicDepartmentRoutes = router;
