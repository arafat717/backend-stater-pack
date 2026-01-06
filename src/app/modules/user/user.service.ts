/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (payload: Partial<IUser>) => {
    const { email, ...rest } = payload;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
        throw new Error("Email already exists");
    }

    const authProvider: IAuthProvider = {provider: 'credentials', providerId: email!};

    const user = await User.create({ email, auths: [authProvider], ...rest });
    return user;
}


const getAllUsersIntoDb = async () => {
    const users = await User.find();
    return users;
}


export const userService = {
    createUserIntoDb,
    getAllUsersIntoDb
};