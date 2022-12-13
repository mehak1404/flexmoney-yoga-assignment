import express from 'express';
import passport from 'passport';
import * as controller from './user.controller.js';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});

// GET
router.get('/getusers', passportJWT, controller.getAll);
router.get(
  '/users/:username',
  passportJWT,
  controller.getUser,
);

// POST
router.post(
  '/users/register',
 controller.register,
);

// PUT

// DELETE

export default router;
