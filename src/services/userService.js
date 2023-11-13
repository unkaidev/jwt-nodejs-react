import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    try {
        await db.User.create(
            {
                username: username,
                email: email,
                password: hashPassword

            }
        )

    } catch (error) {
        console.log(error)
    }

}

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
}

const getUserById = async (userId) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: userId }
    })
    return user;
}

const updateUserInfor = async (email, username, userId) => {
    await db.User.update({
        email: email,
        username: username
    },
        {
            where: { id: userId }
        })
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}