import { UserSchema } from "@/db_schemas/user";
import { User } from '@/models/user';
import { HTTP_STATUS_CODE, jsonResult } from "fortjs";

export class UserService {

    async addUser(user: User) {
        user.platformId = (Math.floor(Math.random()*90000) + 10000).toString();
        const userObj = new UserSchema(user);
        return await userObj.save();
    }

    async getUserByPlatformId(id: string) {
        const user = await UserSchema.findOne({platformId: id});
        return user;
    }

    static async getUserByEmail(email: string) {
        const user = await UserSchema.findOne({emailId:email});
        return user;
    }

    async getAllUsers() {
        const users = await UserSchema.find();
        console.log(users);
        return users;
    }

    async removeUserById(id: string) {
        return await UserSchema.deleteOne({ _id: id });
    }

    async updateUser(user: User) {
        const updateUser = await UserSchema.updateOne({ _id: user._id }, {
            // name: user.name,
            // gender: user.gender,
            emailId: user.emailId,
            // address: user.address
        });
        return updateUser;
    }
}