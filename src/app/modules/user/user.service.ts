import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const user = await User.create({ email, password });
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