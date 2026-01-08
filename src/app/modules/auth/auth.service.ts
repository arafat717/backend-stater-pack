/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { envVars } from "../../config/env";
import { genarateToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const userLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new Error("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password as string, isUserExist.password!);

    if (!isPasswordValid) {
        throw new Error("Incorrect password");
    }

    const tokenPayload = {
        id: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };

    const accessToken = genarateToken(tokenPayload, envVars.JWT_SECRET!, envVars.JWT_EXPIRES_IN!);

    return {
        accessToken
    };
}


export const authService = {
    userLogin
};