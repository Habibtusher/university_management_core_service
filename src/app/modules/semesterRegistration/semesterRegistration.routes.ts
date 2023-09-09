import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterControllerController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router()


router.get('/', SemesterControllerController.getAllFromDB);
router.get('/:id', SemesterControllerController.getByIdFromDB);

router.post(
    '/',
    validateRequest(SemesterRegistrationValidation.create),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    SemesterControllerController.insertIntoDb
);

router.patch(
    '/:id',
    validateRequest(SemesterRegistrationValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    SemesterControllerController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    SemesterControllerController.deleteByIdFromDB
);
export const SemesterRegistrationRoutes =router