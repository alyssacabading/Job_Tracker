import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const defaultJWT = '637ee644d0c61df577eda14d1eed28e4cc12fa2cee3824da3dbae36c869664e5486a000f1a240bd78632d3705d9889ba5d74e67680cdc803581b8a219b127ffb';
const JWT_SECRET = process.env.JWT_SECRET || defaultJWT;

export class AuthService{
    async register(userData: Partial<IUser>): Promise<string> {
        const newUser = new User(userData);
        await newUser.save();
        return this.generateToken(newUser);
    };

    async login(email: string, password: string): Promise<string | null> {
        const user = await User.findOne({ email });
        if ( user && await user.comparePassword(password)) {
            return this.generateToken(user);
        }
        return null;
    };

    private async generateToken(user: IUser): Promise<string> {
        return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
    };

    verifyToken(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return null;
        }
    };
}