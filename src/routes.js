import { Router } from 'express';
import authRouter from './auth/auth.routes';
import campaignRouter from './campaign/campaign.routes';
import centersRouter from './center/center.routes';
import clientRouter from './client/client.routes';
import salesLeadRouter from './salesLead/salesLead.routes';
import './services/passport';
import statsRouter from './stats/stats.routes';
import stuffRouter from './stuff/stuff.routes';
const router = Router();

// const requireAuth = passport.authenticate('jwt', {
//   session: false,
// });

router.use('/auth', authRouter);
router.use('/stuff', stuffRouter);
router.use('/client', clientRouter);
router.use('/sales-lead', salesLeadRouter);
router.use('/stats', statsRouter);
router.use('/centers', centersRouter);
router.use('/campaigns', campaignRouter);

export default router;
