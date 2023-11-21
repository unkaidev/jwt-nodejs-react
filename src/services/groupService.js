import db from "../models"
const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        return {
            EM: 'GET GROUP SUCCESS',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'SOMETHING WENT WRONGS',
            EC: -1,
            DT: []
        }
    }
}
module.exports = {
    getGroups
}