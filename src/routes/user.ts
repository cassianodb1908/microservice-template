import { Router } from 'express';
import UserController from '../app/controller/UserController';

const router = Router();

router.get('/', UserController.get);
router.post('/', UserController.post);

export default router;