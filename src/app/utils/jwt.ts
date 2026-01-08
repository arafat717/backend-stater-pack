import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { envVars } from '../config/env';


export const genarateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    // Token generation logic here
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn } as SignOptions)
    return token;
}

export const verifyToken = (token: string, secret: string): JwtPayload => {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
}


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new Error("Unauthorized");
        }

        const decoded = verifyToken(accessToken, envVars.JWT_SECRET as string);

        if (!decoded) {
            throw new Error("Unauthorized access");
        }

        if (authRoles.length && !authRoles.includes(decoded.role)) {
            throw new Error("Forbidden access");
        }

        next();
    } catch (error) {
        next(error);
    }
}