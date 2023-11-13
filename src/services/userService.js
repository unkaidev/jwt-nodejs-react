import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('INSERT INTO users (email,password,username) VALUES (?,?,?)', [email, hashPassword, username]);
        return rows;

    } catch (error) {
        console.log(error)
    }

}

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;

    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id =?', [id]);
        return rows;

    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id =?', [id]);
        return rows;

    } catch (error) {
        console.log(error)
    }
}

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute(
            'UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        return rows;

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}