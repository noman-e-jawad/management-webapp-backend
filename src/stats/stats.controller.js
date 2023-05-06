import Client from '../client/Client';
import SalesLead from '../salesLead/SalesLead';
import Stuff from '../stuff/Stuff';

//get all stats

export const getEntityCounts = async (req, res) => {
  try {
    const leads = await SalesLead.count();
    const verifiedSalesLeads = await SalesLead.find({
      isVerified: 'true',
    }).count();
    const clients = await Client.count();
    const stuffs = await Stuff.count();

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: {
        leads,
        verifiedSalesLeads,
        clients,
        stuffs,
      },
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get client entity counts
export const getClientEntityCounts = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.query.email });
    const leads = await SalesLead.count({ campaignName: client.campaignName });

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: {
        leads,
      },
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};
