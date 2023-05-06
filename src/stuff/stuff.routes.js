import { Router } from 'express';
import {
  createStuff,
  deleteStuff,
  getAllStuffs,
  getStuffByEmail,
  getStuffById,
  updateStuff,
} from '../stuff/stuff.controller';

const router = Router();

router.post('/create', createStuff); // create stuff
router.get('/all', getAllStuffs); // get all stuff
router.get('/get-by-id', getStuffById); // get stuff by id
router.get('/get-by-email', getStuffByEmail); // get stuff by email
router.put('/update', updateStuff); // update stuff
router.delete('/delete', deleteStuff); // delete stuff

export default router;
