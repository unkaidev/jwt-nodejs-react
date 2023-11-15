import db from "../models"
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";

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
                EC: 2
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)
        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
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
            console.log(">>> found user!")

            let isCorrectPassword = checkPassword(rawUserData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log("Incorrect information: ", rawUserData.valueLogin, "password: ", rawUserData.password);
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
    registerNewUser, handleUserLogin
}