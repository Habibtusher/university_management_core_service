import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';
const router = express.Router();
router.get('/', BuildingController.getAllFromDb);
router.get('/:id', BuildingController.getByIdFromDB);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingValidation.create),
  BuildingController.insertIntoDb
);

router.patch(
    '/:id',
    validateRequest(BuildingValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    BuildingController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    BuildingController.deleteByIdFromDB
);
export const BuildingRoutes = router;
