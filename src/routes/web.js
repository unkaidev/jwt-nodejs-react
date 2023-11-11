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


    return app.use("/", router);
}
export default initWebRoutes;