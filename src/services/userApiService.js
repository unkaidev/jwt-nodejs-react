import db from "../models";

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"], }
        });
        if (users) {
            console.log(users)
            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'GET SUCCESS',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'SOMETHING WENT WRONGS',
            EC: -1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset
            , limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"], }
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        console.log(data);
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'SOMETHING WENT WRONGS',
            EC: -1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (error) {
        console.log(error)
        return {
            EM: 'SOMETHING WENT WRONGS',
            EC: -1,
            DT: []
        }
    }

}
const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            user.save({

            })
        } else {
            //not found
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'SOMETHING WENT WRONGS',
            EC: -1,
            DT: []
        }
    }

}
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'DELETE USER SUCCESS',
                EC: 0,
                DT: []
            }

        } else {
            return {
                EM: 'User not exist!',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'SOMETHING WENT WRONGS',
            EC: -1,
            DT: []
        }
    }

}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}