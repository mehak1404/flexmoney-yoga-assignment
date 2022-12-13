
import { generateToken } from '../../helper/authentication.js';
import models from '../../models/index.js';

const User = models.user;



export const me = async (req, res, next) => {
  const user = await User.findOne({
    attributes: ['id', 'username', 'email', 'batch_id', 'age'],
    where: { id: req.user.id },
  });
  res.json(user);
};
export const login = async (req, res, next) => {
  try {
    const token = generateToken({
      sub: req.user.id,
    });
    const user = await User.findOne({
      attributes: ['id', 'username', 'email', 'age'],
      where: { id: req.user.id },
    });
    const response = {
      token,
      user,
    };
    res.json(response.jsonify());
  } catch (err) {
    
    res.status(402).json(err);
  }
};


export const logout = async (req, res, next) => {
  try {
    // req.user will be null after invoking the logout method
    req.logout();

    const response = {
      message: 'Successfully logged out.',
    };
    res.json(response.jsonify());
  } catch (err) {
    res.status(402).json(err);
  }
};
