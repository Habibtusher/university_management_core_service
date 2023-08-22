import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.Controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.insertntoDb
);
router.get('/', AcademicSemesterController.getAllData);
router.get('/unique', AcademicSemesterController.uniqueSemester);
router.get('/:id', AcademicSemesterController.getDataById);

export const AcademicSemesterRoutes = router;
