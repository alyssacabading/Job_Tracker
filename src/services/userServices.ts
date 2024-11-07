import User, { IUser } from '../models/User.js';

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

    // Functions on User Skills

    async addSkillToUser(userId: string, skillId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        const skill = await Skill.findById(skillId);
        if (!user) throw new Error('User not found');
        if (!skill) throw new Error('Skill not found');
        
        await user.addSkill(skillId);
        return user;
      }

    async removeSkillFromUser(userId: string, skillId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        await user.removeSkill(skillId);
        return user;
    }

    // Functions on User Contacts

    async addContactToUser(userId: string, contactId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        const contact = await Contact.findById(contactId);
        if (!user) throw new Error ('User not found');
        if (!contact) throw new Error ('Contact not found');

        await user.addContact(contactId);
        return user;
    }

    async removeContactFromUser(userId: string, contactId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        await user.removeContact(contactId);
        return user;
    }
}