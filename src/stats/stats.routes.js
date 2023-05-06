import { Router } from 'express';
import { getClientEntityCounts, getEntityCounts } from './stats.controller';

const router = Router();

router.get('/get-entity-counts', getEntityCounts); // get entity counts
router.get('/get-client-entity-counts', getClientEntityCounts); // get client entity counts

export default router;
