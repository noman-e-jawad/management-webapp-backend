import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Client from '../client/Client';
import { client, secret } from '../config/config';
import { sendMail, setMailOptions } from '../config/nodemailer';
import Stuff from '../stuff/Stuff';
dotenv.config();

const tokenForStuff = async (stuff) => {
  const payload = {
    id: stuff._id,
    email: stuff.email,
    role: stuff?.role || 'client',
  };
  const token =
    (await 'Bearer ') + jwt.sign(payload, secret, { expiresIn: '7d' });
  return token;
};
const expireToken = () => {
  return jwt.sign({}, secret, { expiresIn: '-1' });
};

export const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  try {
    let user = await Stuff.findOne({ email: email });
    if (!user) {
      let user = await Client.findOne({ email: email });
      if (!user) {
        res.json({ status: 404, success: false, message: 'User Not Found' });
      }
    }
    console.log({ user });

    const secret = process.env.RESET_PASSWORD_SECRET + user.password;

    console.log({ secret });
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    const link = `${client}/reset-password/${user._id}&t=${token}`;

    const mailOptions = setMailOptions(email, link);
    await sendMail(mailOptions).then(() => {
      res.json({
        status: 200,
        success: true,
        message: 'Mail Send Successful',
        data: {},
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

export const resetPassword = async (req, res) => {
  const { token, id, newPassword } = req.body;
  try {
    let user = await Stuff.findById(id);
    if (!user) {
      let user = await Client.findById(id);
      if (!user) {
        res.json({ status: 404, success: false, message: 'User Not Found' });
      }
    }
    const jwtsecret = process.env.RESET_PASSWORD_SECRET + user.password;
    console.log({ token, jwtsecret });
    const payload = await jwt.verify(token, jwtsecret);
    console.log({ payload });

    user.password = newPassword;
    const newUser = await user.save();
    return res.json({
      status: 200,
      success: true,
      message: 'Password Changed Successfully',
      data: {
        user: newUser,
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

export const logout = (req, res) => {
  try {
    expireToken();
    return res.json({
      status: 200,
      success: true,
      message: 'Logged Out Successfully',
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log({ email, password });
//   try {
//     let user;
//     user = await Stuff.findOne({ email: email });
//     if (!user) {
//       user = await Client.findOne({ email: email });
//     }
//     if (!user) {
//       res.json({
//         status: 404,
//         success: false,
//         message: 'User Not Found',
//       });
//     }

//     // Log the user object to see the password retrieved from the database
//     console.log('User found:', user);

//     // Log the password to see what is being compared
//     console.log('Password from DB:', user.password);

//     compare(password, user.password, async (err, isMatch) => {
//       if (isMatch) {
//         //login successful, set jwt
//         const token = await tokenForStuff(user);
//         return res.json({
//           status: 200,
//           success: true,
//           message: 'Login Successful',
//           data: {
//             name: user.name,
//             email: user.email,
//             role: user?.role || 'client',
//             token,
//           },
//         });
//       } else {
//         return res.json({
//           status: 401,
//           success: false,
//           message: 'Password Does not Match',
//         });
//       }
//     });
//   } catch (error) {
//     return res.json({
//       status: 500,
//       success: false,
//       message: error.message,
//     });
//   }
// };

//modified sign in
export const signin = async (req, res, next) => {
  const { email } = req.body; // Only capturing the email
  console.log({ email });

  try {
    let user;
    user = await Stuff.findOne({ email: email });
    if (!user) {
      user = await Client.findOne({ email: email });
    }

    // Check if user is found
    if (!user) {
      return res.json({
        status: 404,
        success: false,
        message: 'User Not Found',
      });
    }

    // Log the user object to see the details retrieved from the database
    console.log('User found:', user);

    // Directly log in if the email matches
    const token = await tokenForStuff(user); // Still generating a token
    return res.json({
      status: 200,
      success: true,
      message: 'Login Successful',
      data: {
        name: user.name,
        email: user.email,
        role: user?.role || 'client',
        token,
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

export const getSecret = (req, res) => {
  return res.json({
    data: 'Secret',
  });
};

export const getUserById = async (req, res) => {
  try {
    let user = await Stuff.findById(req.query.id);
    if (!user) {
      user = await Client.findById(req.query.id);
    }
    if (!user) {
      return res.json({
        status: 404,
        success: false,
        message: 'User Not Found',
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        message: 'User fetched successfully',
        data: {
          user,
        },
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
