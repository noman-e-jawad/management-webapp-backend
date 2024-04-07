import { Router } from 'express';
import {
  createCampaign,
  deleteCampaign,
  getAllCampaigns,
  getCampaignById,
  getCampaignsByClientEmail,
  getCampaignsByClientId,
  updateCampaign,
} from './campaign.controller';

const router = Router();

router.get('/all', getAllCampaigns); // get all campaigns
router.get('/get-by-id', getCampaignById); // get campaign by id
router.get('/get-by-client-id', getCampaignsByClientId); // get campaigns by client id
router.get('/get-by-client-email', getCampaignsByClientEmail); // get campaigns by client email

router.post('/create', createCampaign); // create campaign

router.put('/update', updateCampaign); // update campaign

router.delete('/delete', deleteCampaign); // delete campaign

export default router;
