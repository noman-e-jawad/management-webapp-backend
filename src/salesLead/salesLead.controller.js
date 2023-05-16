import Client from '../client/Client';
import SalesLead from './SalesLead';
//create lead
export const createSalesLead = async (req, res) => {
  // const {
  //   centerName,
  //   campaignName,
  //   agentName,
  //   companyName,
  //   contactPerson,
  //   companyAddress,
  //   zipCode,
  //   phone,
  //   altPhone,
  //   email,
  //   appointmentDate,
  //   appointmentTime,
  //   activelySeeking,
  //   currentFrequency,
  // } = req.body;
  try {
    const lead = new SalesLead(req.body);
    lead
      .save()
      .then(() => {
        return res.json({
          status: 200,
          success: true,
          message: 'SalesLead Created Successfully',
          data: lead,
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.json({
          status: 500,
          success: false,
          message: 'An Error Occured',
        });
      });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get all leads
export const getAllSalesLeads = async (req, res) => {
  try {
    const leads = await SalesLead.find().sort({ createdAt: -1 });
    if (!leads) {
      return res.json({
        status: 404,
        success: false,
        message: 'No SalesLead Available',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'All SalesLeads Fetched Successfully',
      data: leads,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get verified leads
export const getVerifiedSalesLeads = async (req, res) => {
  try {
    const leads = await SalesLead.find({ isVerified: 'true' }).sort({
      createdAt: -1,
    });
    if (!leads) {
      return res.json({
        status: 404,
        success: false,
        message: 'No SalesLead Available',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'All SalesLeads Fetched Successfully',
      data: leads,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get lead by id
export const getSalesLeadById = async (req, res) => {
  try {
    const lead = await SalesLead.findById(req.query.id);
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: lead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get leads by agent name
export const getSalesLeadsByAgent = async (req, res) => {
  try {
    const lead = await SalesLead.findOne({
      agentName: req.query.agentName,
    });
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: lead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get leads by email
export const getSalesLeadsByEmail = async (req, res) => {
  try {
    const user = await Client.findOne({ email: req.query.email });
    const lead = await SalesLead.find({
      campaignName: user.campaignName,
    });
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: lead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get leads by campaign name
export const getSalesLeadsByCampaign = async (req, res) => {
  try {
    const lead = await SalesLead.find({
      campaignName: req.query.campaignName,
    });
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: lead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get leads by daterange

/* Three things:

To use dates in your queries, you need to wrap the strings in ISODate
Dates need to be in Y-M-D format
I’m guessing you probably want to also include data from the last day of April. In this case you should bring the end date forward by one day.
Putting these together, the query you likely want is:

{createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}} */

export const getSalesLeadsByDaterange = async (req, res) => {
  try {
    const lead = await SalesLead.findOne({
      createdAt: {
        $gte: ISODate(req.query.startingDate),
        $lt: ISODate(req.query.endingDate),
      },
    });
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Fetched Successfully',
      data: lead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//update lead
export const updateSalesLead = async (req, res) => {
  try {
    const lead = await SalesLead.findById(req.body.id);
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }

    const updatedSalesLead = await SalesLead.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Updated Successfully',
      data: updatedSalesLead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//verify lead
export const verifySalesLead = async (req, res) => {
  try {
    console.log(req.body.id);
    const lead = await SalesLead.findById(req.body.id);
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }

    const updatedSalesLead = await SalesLead.findByIdAndUpdate(
      req.body.id,
      { isVerified: lead.isVerified === 'true' ? 'false' : 'true' },
      {
        new: true,
      }
    );

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Updated Successfully',
      data: updatedSalesLead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//star lead
export const starSalesLead = async (req, res) => {
  try {
    console.log(req.body.id);
    const lead = await SalesLead.findById(req.body.id);
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }

    const updatedSalesLead = await SalesLead.findByIdAndUpdate(
      req.body.id,
      { isStarred: lead.isStarred === 'true' ? 'false' : 'true' },
      {
        new: true,
      }
    );

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Updated Successfully',
      data: updatedSalesLead,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//verify many leads
export const verifyMultipleSalesLeads = async (req, res) => {
  return res.json({
    status: 500,
    success: false,
    message: 'Import SalesLead',
  });
};

//delete lead
export const deleteSalesLead = async (req, res) => {
  try {
    const lead = await SalesLead.findById(req.query.id);
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }

    await SalesLead.findByIdAndDelete(req.query.id);

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Deleted Successfully',
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};
//delete many lead
export const deleteMultipleSalesLeads = async (req, res) => {
  try {
    const lead = await SalesLead.findById(req.body.id);
    if (!lead) {
      return res.json({
        status: 404,
        success: false,
        message: 'SalesLead Not Found',
      });
    }

    await SalesLead.deleteMany();

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Deleted Successfully',
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//import lead
export const importSalesLead = async (req, res) => {
  try {
    const leads = await SalesLead.create(req.body);

    return res.json({
      status: 200,
      success: true,
      message: 'SalesLead Created Successfully',
      data: leads,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

// filter leads
export const getSortSalesLeads = async (req, res) => {
  const filterFormValues = req.query;
  try {
    const filter = {};
    for (const [name, value] of Object.entries(filterFormValues)) {
      filter[name] = value;
    }
    const sortedSalesLead = await SalesLead.find(filter);
    if (sortedSalesLead.length !== 0) {
      return res.json({
        status: 200,
        success: true,
        data: sortedSalesLead,
      });
    } else {
      return res.json({
        status: 404,
        success: false,
        message: 'No Such SalesLead Not Found',
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

// get datas inside sales data
export const getFiltersFromSalesleads = async (req, res) => {
  try {
    const filter = await SalesLead.distinct(req.query.salesFilter);
    if (!filter) {
      return res.json({
        status: 404,
        success: false,
        message: 'No Agent Available',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'All Agent Fetched Successfully',
      data: filter,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};
