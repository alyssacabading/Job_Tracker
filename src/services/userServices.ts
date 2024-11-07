import User, { IUser } from '../models/user.js';

export class UserService {
    async createUser (userData: IUser): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    };

    async getAllUsers(): Promise<IUser[]> {
        return await User.find();
    };

    async getUserById(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    };

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    };

    async deleteUser(userId: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(userId);
    }
}