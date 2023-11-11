const handlerHelloWord = (req, res) => {
    return res.render("home.ejs");
}

const handlerUserPage = (req, res) => {
    //model => get data from database

    return res.render("user.ejs");
}

module.exports = {
    handlerHelloWord, handlerUserPage
}