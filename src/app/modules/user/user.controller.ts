/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            user
        });
    } catch (err: any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Internal Server Error",
            err
        })
    }
}

export const UserController = {
    createUser
};