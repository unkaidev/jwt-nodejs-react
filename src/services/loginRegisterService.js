require('dotenv').config()
import db from "../models"
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";
import { getGroupWithRoles } from './JWTService'
import { createJWT } from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false
}

const registerNewUser = async (rawUserData) => {
    try {
        // check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)
        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4
        })
        return {
            EM: 'A user is created successfully!',
            EC: 0
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something is wrongs in service...',
            EC: -2
        }
    }


}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawUserData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin }
                ]
            }
        })
        // console.log(">>check user: ", user.get({ plain: true }))
        if (user) {
            let isCorrectPassword = checkPassword(rawUserData.password, user.password);
            if (isCorrectPassword === true) {

                // token 

                //test roles
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    email: user.email,
                    username: user.username,
                }
                let token = createJWT(payload);
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }

        return {
            EM: 'Your email/phone number or password is incorrect!',
            EC: -2,
            DT: ''
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something is wrongs in service...',
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}