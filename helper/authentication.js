import JWT from 'jsonwebtoken';

export function generateToken(payload) {
  return `Bearer ${JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  })}`;
}

export default { generateToken };
