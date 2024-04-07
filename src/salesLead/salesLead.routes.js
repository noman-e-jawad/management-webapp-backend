import { Router } from 'express';
import {
  createSalesLead,
  deleteMultipleSalesLeads,
  deleteSalesLead,
  getAllSalesLeads,
  getFiltersFromSalesleads,
  getSalesLeadById,
  getSalesLeadsByAgent,
  getSalesLeadsByCampaign,
  getSalesLeadsByDaterange,
  getSalesLeadsByEmail,
  getSalesleadsFromDates,
  getSortSalesLeads,
  getVerifiedSalesLeads,
  importSalesLead,
  starSalesLead,
  updateSalesLead,
  verifyMultipleSalesLeads,
  verifySalesLead,
} from '../salesLead/salesLead.controller';

const router = Router();

router.post('/create', createSalesLead); // create sales lead
router.post('/import', importSalesLead); // create sales lead
router.get('/all', getAllSalesLeads); // get all sales lead
router.get('/verified', getVerifiedSalesLeads); // get all sales lead
router.get('/get-by-id', getSalesLeadById); // get sales lead by id
router.get('/get-by-email', getSalesLeadsByEmail); // get sales lead by id
router.get('/get-by-campaign', getSalesLeadsByCampaign); // get sales lead by campaign
router.get('/get-by-agent', getSalesLeadsByAgent); // get sales lead by agent
router.get('/get-by-daterange', getSalesLeadsByDaterange); // get sales lead by agent
router.get('/sorted', getSortSalesLeads); // get sorted leads
router.get('/get-by-dates', getSalesleadsFromDates); //get sorted leads by date and date range
router.get('/filters-from-saleslead', getFiltersFromSalesleads); // get any columns from leads table
router.put('/update', updateSalesLead); // update sales lead
router.put('/verify', verifySalesLead); // verify a specific sales lead
router.put('/star', starSalesLead); // star/unstar a specific sales lead
router.put('/verify-many', verifyMultipleSalesLeads); // verify multiple sales leads
router.delete('/delete', deleteSalesLead); // delete sales lead
router.delete('/deletemany', deleteMultipleSalesLeads); // delete sales lead

export default router;
