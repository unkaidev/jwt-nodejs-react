import db from "../models"



const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true
        }
        )
        const persists = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2));

        if (persists.length === 0) {
            return {
                EM: 'NOTHING TO CREATE',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `CREATE ROW SUCCESS: ${persists.length} roles`,
            EC: 0,
            DT: []
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

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll(
            { order: [['id', 'DESC']] }
        );
        return {
            EM: `Get all roles success`,
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
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        });
        await role.destroy();
        return {
            EM: `Delete role success`,
            EC: 0,
            DT: []
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: `Not found any roles`,
                EC: 0,
                DT: []
            }
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        })
        return {
            EM: `Get role by success`,
            EC: 0,
            DT: roles
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
    createNewRoles, getAllRoles, deleteRole, getRoleByGroup
}