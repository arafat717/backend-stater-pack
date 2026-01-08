/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUserIntoDb(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User created successfully",
        data: user
    });
});


const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getAllUsersIntoDb();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users retrived successfully",
        data: user
    });
});


// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await userService.createUserIntoDb(req.body);
//         res.status(StatusCodes.CREATED).json({
//             message: "User created successfully",
//             user
//         });
//     } catch (err: any) {
//         next(err);
//     }
// }

export const UserController = {
    createUser,
    getAllUser
};