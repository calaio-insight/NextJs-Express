import { IUser } from "../interfaces/user.interface";
const jwt = require('jsonwebtoken');

const userRepo = require('../dataAccess/user.repository');


async function getUserByEmail (email: string) {
    let user = await userRepo.getUserByEmail(email);
    return user;    
}

async function getUserById (userId: number) {
    let user = await userRepo.getUserById(userId);
    return user;    
}

async function register (newUser: IUser){
    let newUserId = await userRepo.insertUser(newUser);
    const user = await userRepo.getUserById(newUserId);
    return user;
}

async function createJwt (user: IUser){
    const payload = {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
        role: 'User'
    }
    const secretKey = process.env.JWT_KEY;
    const options = {
        expiresIn: '24h'
    }
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

module.exports = {
    getUserByEmail,
    getUserById,
    register,
    createJwt
}