import express from 'express';
import passport from 'passport';
import * as controller from './auth.controller.js';

const router = express.Router();

const passportLocal = passport.authenticate('local', {
  session: false,
  failWithError: true,
});

const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});

// GET
router.get('/auth/logout', passportJWT, controller.logout);

// POST
router.post(
  '/auth/login',
  passportLocal,
  controller.login,
);

router.get('/auth/me', passportJWT, controller.me);

// PUT

// DELETE

export default router;
