import Center from './Center';

//get all centers
export const getAllCenters = async (req, res) => {
  //fetch all centers
  try {
    const centers = await Center.find();

    if (centers?.length) {
      return res.json({
        status: 200,
        success: true,
        message: 'Center Fetched Successfully',
        data: centers,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        message: 'No Centers Found',
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
//get center by id
export const getCenterById = async (req, res) => {
  const { id } = req.query;
  //fetch center by id
  try {
    const center = await Center.findById(id);

    if (center) {
      return res.json({
        status: 200,
        success: true,
        message: 'Center Fetched Successfully',
        data: center,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        message: 'No Center Found',
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

//create center
export const createCenter = async (req, res) => {
  const { centerName } = req.body; // get the center from the request body
  try {
    // create a new instance of center
    const center = await new Center({
      centerName,
    });
    // save the center
    center
      .save()
      .then(() => {
        // send the json response
        return res.json({
          status: 201,
          success: true,
          message: 'Center Created Successfully',
          data: center,
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

//update center
export const updateCenter = async (req, res) => {
  const { id, centerName } = req.body;
  try {
    Center.findByIdAndUpdate(
      id,
      { centerName },
      {
        new: true,
      }
    )
      .then((resp) => {
        if (resp) {
          return res.json({
            status: 200,
            success: true,
            message: 'Center Updated Successfully',
            data: resp,
          });
        } else {
          return res.json({
            status: 404,
            success: false,
            message: 'Center Not Found',
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
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

//delete center
export const deleteCenter = async (req, res) => {
  try {
    Center.findByIdAndDelete(req.query.id)
      .then(() => {
        return res.json({
          status: 200,
          success: true,
          message: 'Center Deleted Successfully',
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
