import { Router } from 'express';
import bcrypt from 'bcryptjs';
import thenify from 'thenify';
import models from '../models';

const { user: User } = models;

const genSalt = thenify(bcrypt.genSalt);
const hash = thenify(bcrypt.hash);
const compare = thenify(bcrypt.compare);
const authRouter = new Router();


authRouter.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  let user;
  try {
    user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
  } catch (err) {
    console.log('error: unable to create account');
    console.log(err);
  }

  res.json({
    id: user.id,
  });
});

authRouter.post('/signin', async (req, res) => {
  const { password, name } = req.body;
  let user;
  let status;
  try {
    user = await User.findOne({
      where: { name }
    });
  } catch (err) {
    console.log(`error: cannot find user ${name}`);
    console.log(err);
    status = false;
    res.json({ success: status });
  }

  try {
    status = await compare(password, user.password);
    console.log(`login status: ${status}`);
    res.json({
      success: status,
      id: user.id,
      email: user.email,
      name: user.name
    });
  } catch (err) {
    console.log(err);
  }
});

export default authRouter;
