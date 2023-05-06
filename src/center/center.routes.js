import { Router } from 'express';
import {
  createCenter,
  deleteCenter,
  getAllCenters,
  getCenterById,
  updateCenter,
} from './center.controller';

const router = Router();

router.get('/all', getAllCenters); // get all centers
router.get('/get-by-id', getCenterById); // get center by id
router.post('/create', createCenter); // create centers
router.put('/update', updateCenter); // update centers
router.delete('/delete', deleteCenter); // get all centers

export default router;
