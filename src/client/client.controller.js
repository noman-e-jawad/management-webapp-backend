import { compare } from 'bcrypt-nodejs';
import Campaign from '../campaign/Campaign';
import Client from './Client';

//create client
export const createClient = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    campaignName,
    companyName,
    companyAddress,
  } = req.body;

  try {
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.json({
        status: 422,
        success: false,
        message: 'Email Already in Use',
      });
    }
    const existingCompanyName = await Client.findOne({ companyName });

    if (existingCompanyName) {
      return res.json({
        status: 422,
        success: false,
        message: 'Company name must be unique',
      });
    }

    const client = new Client(req.body);

    client.save();
    return res.json({
      status: 200,
      success: true,
      message: 'Client Created Successfully',
      data: client,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get all client
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    if (!clients) {
      return res.json({
        status: 404,
        success: false,
        message: 'No Client Available',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'All Clients Fetched Successfully',
      data: clients,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get client by id
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.query.id);
    if (!client) {
      return res.json({
        status: 404,
        success: false,
        message: 'Client Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'Client Fetched Successfully',
      data: client,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get client by email
export const getClientByEmail = async (req, res) => {
  try {
    const client = await Client.findOne({
      email: req.query.email,
    });
    if (!client) {
      return res.json({
        status: 404,
        success: false,
        message: 'Client Not Found',
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: 'Client Fetched Successfully',
      data: client,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//update client
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.body.id);
    if (!client) {
      return res.json({
        status: 404,
        success: false,
        message: 'Client Not Found',
      });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
      }
    );
    await client.save();

    return res.json({
      status: 200,
      success: true,
      message: 'Client Updated Successfully',
      data: updatedClient,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const client = await Client.findById(req.body.id);
    if (!client) {
      return res.json({
        status: 404,
        success: false,
        message: 'Client Not Found',
      });
    }

    await compare(currentPassword, client.password, async (err, isMatch) => {
      if (isMatch) {
        const updatedClient = await Client.findByIdAndUpdate(
          req.body.id,
          { password: newPassword },
          { new: true }
        );
        await updatedClient.save();
        return res.json({
          status: 200,
          success: true,
          message: 'Password Changed Successfully',
          newPassword: updatedClient.password,
        });
      } else {
        return res.json({
          status: 403,
          success: false,
          message: 'Incorrect Current Password',
        });
      }
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//delete client
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.query.id);
    if (!client) {
      return res.json({
        status: 404,
        success: false,
        message: 'Client Not Found',
      });
    }

    await Client.findByIdAndDelete(req.query.id);

    return res.json({
      status: 200,
      success: true,
      message: 'Client Deleted Successfully',
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//get user by campaign id
export const getUserByCampaignId = async (req, res) => {
  const { id } = req.query; //get campaign id
  //fetch campaign by id
  try {
    Campaign.findById(id)
      .then((campaign) => {
        if (campaign) {
          //fetch client by client id provided in campaign
          Client.findById(campaign.client)
            .then((client) => {
              return res.json({
                status: 200,
                success: true,
                message: 'User Fetched Successfully',
                data: client,
              });
            })
            .catch((error) => {
              return res.json({
                status: error.statusCode,
                success: false,
                message: error.message,
              });
            });
        } else {
          return res.json({
            status: 404,
            success: false,
            message: 'No Campaign Found',
          });
        }
      })
      .catch((error) => {
        return res.json({
          status: 404,
          success: false,
          message: 'No Campaign Found',
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

//get client by campaign code name
export const getUserByCampaignCodeName = async (req, res) => {
  const { codeName } = req.query; //get campaign code name
  //fetch campaign by campaign name
  try {
    Campaign.findOne({ codeName })
      .then((campaign) => {
        if (campaign) {
          //fetch client by the client id provided in campaign
          Client.findById(campaign.client, (error, client) => {
            return res.json({
              status: 200,
              success: true,
              message: 'Client Fetched Successfully',
              data: client,
            });
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
