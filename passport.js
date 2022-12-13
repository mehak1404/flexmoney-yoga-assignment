import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJWT } from 'passport-JWT';
import { Strategy as LocalStrategy } from 'passport-local';
import models from './models/index.js';
import dotenv from 'dotenv';
dotenv.config();
const User = models.user;

const JWTOptions = {
  JWTFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  
};
const localOptions = {
  usernameField: 'email',
};

// JWT Strategy
passport.use(
  new JWTStrategy(JWTOptions, async (payload, done) => {
    try {
      // Find the user specified in the token
      const user = await User.findByPk(payload.sub);

      // Check if user does not exists
      if (!user) {
        return done(null, false);
      }

      // Return the user if it exists
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

// Local Strategy
passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      // Check if the email exists
      const user = await User.findOne({
        where: { email },
      });

      // Check if the user does not exists given the email
      if (!user) {
        return done(null, false);
      }

      // Check if the password is correct
      const validPassword = await user.isValidPassword(password);

      if (!validPassword) {
        return done(null, false);
      }

      // Return the user details if the password and email is correct
      // req.user now contains the user details
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);
