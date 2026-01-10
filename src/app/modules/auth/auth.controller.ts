/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.userLogin(req.body);

    res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        secure: false
    })
    
    res.cookie('accessToken', user.accessToken, {
        httpOnly: true,
        secure: false
    })

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logged in successfully",
        data: user
    });
});


const createNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const user = await authService.createNewAccessToken(refreshToken as string);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Refresh token created successfully!",
        data: user
    });
});


export const AuthController = {
    loginUser,
    createNewAccessToken
};