import Jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import User from '../models/user';
import bcryptjs from 'bcryptjs';
import Constants from '../util/constants';

export async function signup(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<any> {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const err: any = new Error('Validation error');
         err.statusCode = 400;
         err.data = errors.array();
         throw err;
      }
      const newUserData = new User({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         username: req.body.username,
         email: req.body.email,
         password: await bcryptjs.hash(req.body.password, 12)
      });
      const user = await newUserData.save();
      return res.status(200).json(user);
   } catch (err) {
      // Pass the error if exist to the next middleware
      next(err);
   }
}

export async function login(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<any> {
   try {
      const emailOrUsername = req.body.emailOrUsername;
      const password = req.body.password;
      const loadUser = await User.findOne({
         $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });
      if (!loadUser || !(await bcryptjs.compare(password, loadUser.password))) {
         const error: any = new Error('Wrong credentials');
         error.statusCode = 401;
         throw error;
      }
      const token: string = Jwt.sign(
         {
            username: loadUser?.username,
            userId: loadUser?._id.toString(),
         },
         Constants.PASSWORD_ENCRYPTION_KEY,
         { expiresIn: '48h' },
      );
      const restUser = JSON.parse(JSON.stringify(loadUser));
      delete restUser.password;
      res.status(200).json({
         token,
         user: restUser,
      });
   } catch (err) {
      next(err);
   }
}
