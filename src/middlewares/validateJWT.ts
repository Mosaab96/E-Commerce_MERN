import e, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModels';


interface ExtendRequest extends Request {
    user?: any; // You can replace 'any' with a more specific type if you have one
}

const valodateJWT = (req:ExtendRequest, res:Response, next:NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
         res.status(403).send({ message: 'Authorization header not provided' });
        return;
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(403).send({ message: 'Bearer token not found' });
        return;
    }

    jwt.verify(token, 'nXS1tvBqU6hORNNdWm20fHWFTkIueLit', async (err, payload) => {
        if (err) {
            res.status(403).send({ message: 'Invalid token' });
            return;
        }
         const userpayload=payload as {
            email:string;
            firstName:string;
            lastName:string;
         };
        //Fatch user from dataase based on payload info and attach to req object
        const user=await UserModel.findOne({email:userpayload.email});
        req.user=user;
        next();  
       
    });
}

export default valodateJWT;
