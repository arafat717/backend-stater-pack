/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUserIntoDb(req.body);
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            user
        });
    } catch (err: any) {
        next(err);
    }
}

export const UserController = {
    createUser
};