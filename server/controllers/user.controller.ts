import express = require('express');
import { IUser } from '../interfaces/user.interface';
const router = express.Router();
const jwt = require('jsonwebtoken');

const userService = require('../services/user.service');

// Take in google credential, decode jwt, check if user exists in db, create user if not, return user
router.post('/login', async (req, res) => {
    const { credential } = req.body;
    
    try {
        const profile = jwt.decode(credential);
        console.log('GOOGLE PROFILE:');
        console.log(profile);

        let existingUser: IUser|undefined = await userService.getUserByEmail(profile.email);        
        if (!existingUser){
            // If no user found, create user
            const userData: IUser = {
                email: profile.email,
                firstName: profile.given_name,
                lastName: profile.family_name,
                displayName: `${profile.given_name} ${profile.family_name}`,
                photoUrl: profile.picture
            }
            const newUser = await userService.register(userData);
            existingUser = newUser;
        }      
        
        // Create jwt token for existingUser
        existingUser!.jwtToken = await userService.createJwt(existingUser);
        console.log('USER:');
        console.log(existingUser);

        res.json(existingUser);
    }
    catch (err) {
        console.log(err);
        res.json('');
    }    
});

/* GET by id */
router.get('/', async (req: any, res: any) => {
    try {
        res.json(await userService.getUserById(req.query.userId));
    } catch (err) {
        console.log("ERROR: " + err);
    }    
});


module.exports = router;