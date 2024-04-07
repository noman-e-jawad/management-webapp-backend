import Client from '../client/Client';
import Campaign from './Campaign';

//get all campaigns
export const getAllCampaigns = async (req, res) => {
  //fetch all campaigns
  try {
    const campaigns = await Campaign.find();

    if (campaigns?.length) {
      return res.json({
        status: 200,
        success: true,
        message: 'Campaigns Fetched Successfully',
        data: campaigns,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        message: 'No Campaigns Found',
        data: [],
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

//get camapaign by id
export const getCampaignById = async (req, res) => {
  const { id } = req.query;
  //fetch campaign by id
  try {
    const campaign = await Campaign.findById(id);

    if (campaign) {
      return res.json({
        status: 200,
        success: true,
        message: 'Campaign Fetched Successfully',
        data: campaign,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        message: 'No Campaign Found',
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: 'An error Occured',
    });
  }
};

//create campaign
export const createCampaign = async (req, res) => {
  const { companyName, codeName } = req.body; // get the campaign from the request body
  try {
    //check for duplicate campaign codeName
    Campaign.findOne({ codeName })
      .then(async (campaign) => {
        if (campaign) {
          return res.json({
            status: 403,
            success: false,
            message: 'Duplicate Campaign Code Name',
          });
        } else {
          //check if the client exists
          Client.findOne({ companyName })
            .then(async (client) => {
              if (client) {
                // create a new instance of campaign
                const campaign = await new Campaign({
                  client,
                  codeName,
                });
                // save the campaign
                campaign
                  .save()
                  .then(() => {
                    // push and update the client's campaigns array
                    console.log(client);
                    Client.findOneAndUpdate(
                      { _id: client },
                      { $push: { campaigns: campaign._id } },
                      { new: true },
                      (error, client) => {
                        if (error) {
                          return res.json({
                            status: error.statusCode,
                            success: false,
                            message: error.message,
                          });
                        } else {
                          // send the json response
                          return res.json({
                            status: 201,
                            success: true,
                            message: 'Campaign Created Successfully',
                            data: campaign,
                            client: client,
                          });
                        }
                      }
                    );
                  })
                  .catch((error) => {
                    return res.json({
                      status: 500,
                      success: false,
                      message: error.message,
                    });
                  });
              } else {
                return res.json({
                  status: 404,
                  success: false,
                  message: 'Company does not exist',
                });
              }
            })
            .catch((error) => {
              return res.json({
                status: 500,
                success: false,
                message: error.message,
              });
            });
        }
      })
      .catch();
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//Update campaign
export const updateCampaign = async (req, res) => {
  const { id, codeName } = req.body;
  try {
    //check for duplicate campaign codeName
    Campaign.findOne({ codeName })
      .then((campaign) => {
        if (campaign) {
          return res.json({
            status: 403,
            success: false,
            message: 'Duplicate Campaign Name',
          });
        } else {
          Campaign.findByIdAndUpdate(id, { codeName }, { new: true })
            .then((resp) => {
              if (resp) {
                return res.json({
                  status: 200,
                  success: true,
                  message: 'Campaign Updated Successfully',
                  data: resp,
                });
              } else {
                return res.json({
                  status: 404,
                  success: false,
                  message: 'Campaign Not Found',
                });
              }
            })
            .catch((error) => {
              return res.json({
                status: 500,
                success: false,
                message: error.message,
              });
            });
        }
      })
      .catch();
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//delete campaign
export const deleteCampaign = async (req, res) => {
  try {
    Campaign.findByIdAndDelete(req.query.id)
      .then(() => {
        return res.json({
          status: 200,
          success: true,
          message: 'Campaign Deleted Successfully',
        });
      })
      .catch((error) => {
        return res.json({
          status: 500,
          success: false,
          message: error.message,
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

//get campaigns by client id
export const getCampaignsByClientId = async (req, res) => {
  const { id } = req.query; //get client id
  //fetch campaign by client id
  try {
    Client.findById(id)
      .then((client) => {
        if (client) {
          Campaign.find({ _id: { $in: client.campaigns } })
            .then((campaigns) => {
              return res.json({
                status: 200,
                success: true,
                message: 'Campaign Fetched Successfull',
                data: campaigns,
              });
            })
            .catch((error) => {
              return res.json({
                status: 404,
                success: false,
                message: 'Campaigns Not Found',
              });
            });
        } else {
          return res.json({
            status: 404,
            success: false,
            message: 'Client Not Found',
          });
        }
      })
      .catch((error) => {
        return res.json({
          status: error.statusCode,
          success: false,
          message: error.message,
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

//get campaigns by client email
export const getCampaignsByClientEmail = async (req, res) => {
  const { email } = req.query; //get client email
  //fetch campaign by client email
  try {
    Client.findOne({ email })
      .then((client) => {
        if (client) {
          Campaign.find({ _id: { $in: client.campaigns } })
            .then((campaigns) => {
              return res.json({
                status: 200,
                success: true,
                message: 'Campaign Fetched Successfull',
                data: campaigns,
              });
            })
            .catch((error) => {
              return res.json({
                status: 404,
                success: false,
                message: 'Campaigns Not Found',
              });
            });
        } else {
          return res.json({
            status: 404,
            success: false,
            message: 'Client Not Found',
          });
        }
      })
      .catch((error) => {
        return res.json({
          status: error.statusCode,
          success: false,
          message: error.message,
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
