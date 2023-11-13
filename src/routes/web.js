import express from "express";
import homeController from '../controller/homeController'

const router = express.Router();

/**
 * 
 * @param {*} app :express app 
 */
const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handlerHelloWord);
    router.get("/user", homeController.handlerUserPage);
    router.post("/users/create-user",homeController.handlerCreaterNewUser)


    return app.use("/", router);
}
export default initWebRoutes;