import e from "express";
import { error } from "node:console";
import UserModel from "../models/userModels";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface Registerparams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export const register=async({firstName,lastName,email,password}:Registerparams)=>{
    const findUser=await UserModel.findOne({email});
    if(findUser){
        return {data:"User already exists", status:400};
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new UserModel({email,password:hashedPassword,firstName,lastName});
    await newUser.save();
    return {data:generateToken({firstName,lastName,email}),status:200};
}
interface LoginParams {
    email: string;
    password: string;
}
export const login=async({email,password}:LoginParams)=>{
    const findUser=await UserModel.findOne({email});
    if(!findUser){
        return {data:generateToken("incorrect email or password"),status:400};
    }
    const passwordMatch=await bcrypt.compare(password,findUser.password);
    if(passwordMatch){
        return {data:generateToken({firstName:findUser.firstName,lastName:findUser.lastName,email:findUser.email}),status:200};
}
return {data:"An error email or password",status:400};
}

const generateToken=(data:any)=>{
    return jwt.sign(data,"nXS1tvBqU6hORNNdWm20fHWFTkIueLit")
}