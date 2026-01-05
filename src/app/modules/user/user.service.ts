import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const user = await User.create({ email, password });
    return user;
}


export const userService = {
    createUserIntoDb
};