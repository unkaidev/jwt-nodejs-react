import userService from "../services/userService"

const handlerHelloWord = (req, res) => {
    return res.render("home.ejs");
}

const handlerUserPage = async (req, res) => {
    //model => get data from database
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}
const handlerCreaterNewUser = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // let check = bcrypt.compareSync(password, hashPassword);

    userService.createNewUser(email, password, username)

    return res.send("handlerCreaterNewUser");
}

module.exports = {
    handlerHelloWord, handlerUserPage, handlerCreaterNewUser
}