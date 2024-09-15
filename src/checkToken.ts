import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from './server';
import { Request } from 'express';


export const checkToken = async (req: Request, jwtSecret: string, users: User[]): Promise<{ user: User | undefined, error: string }> => {
    const url = new URL(req.url as string, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
  
    if (!token) {
      console.log(`No token provided`);
      return { user: undefined, error: 'No token provided' };
    }
  
    // Create a promise-based wrapper for jwt.verify
    const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded as JwtPayload);
        });
      });
    };
  
    try {
      const decoded = await verifyToken(token, jwtSecret);
  
      const user = users.find(u => u.username === decoded.username);
  
      if (!user) {
        console.log(`Unknown user`);
        return { user: undefined, error: 'Unknown user' };
      }
  
      return { user: user, error: '' }; // Success
    } catch (err) {
      console.log(`Token invalid`);
      return { user: undefined, error: 'Token expired or invalid' }; //
    }  
}