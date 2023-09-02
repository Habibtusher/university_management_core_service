import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.Controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.insertntoDb
);
router.get('/', AcademicSemesterController.getAllData);
router.get('/unique', AcademicSemesterController.uniqueSemester);
router.get('/:id', AcademicSemesterController.getDataById);

export const AcademicSemesterRoutes = router;
