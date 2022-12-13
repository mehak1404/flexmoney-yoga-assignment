import Sequelize from 'sequelize';
import models from '../../models/index.js';
import { generateToken } from '../../helper/authentication.js';

const { Op } = Sequelize;
const User = models.user;


export const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['email', 'id', 'name', 'username', 'role'],
    });

    const response ={
      data: users,
    };

    res.send(response.jsonify());
  } catch (err) {
    res.status(402).json(err);
    
  }
};


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    const response = { data: user };

    res.send(response.jsonify());
  } catch (err) {
    
      res.status(402).json(err);
  }
};


export const register = async (req, res, next) => {
  try {
    // Check if password and confirmPassword are the same
    // if (req.body.password !== req.body.confirmPassword) {
    //   throw err({
    //     message: 'Passwords do not match.',
    //   });
    // }
    if(req.body.age >65 || req.body.age <18){
      return res.status(402).json("age is not valid")
    }
    // Check if the email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: req.body.email,
          },
          {
            username: req.body.username,
          },
        ],
      },
    });

    // If another user with the same username of email already exists
    if (existingUser) {
      if (existingUser.email === req.body.email) {
        const msg ={
          res: 'Email already exists.'
        }
        res.status(402).json(
           msg
        );
      }

      else if (existingUser.username === req.body.username) {
        const msg ={
          res: 'username already exists'
        }
        res.status(402).json(
           msg
        );
      }
    }
    else{

      const user = {
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        // batch_id: req.body.batch_id,
      };
  
      const result = await User.create(user);
  
      const token = generateToken({
        sub: result.id,
      });
  
      const response = {
        token,
      };
      return res.status(200).json(response);
    }
  } catch (err) {
      return res.status(402).json(err);
    
  }
};
