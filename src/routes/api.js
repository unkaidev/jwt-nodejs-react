import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import roleController from '../controller/roleController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

const router = express.Router();

/**
 * 
 * @param {*} app :express app 
 */


const initApiRoutes = (app) => {
    //path, handler
    router.all('*', checkUserJWT, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    router.get("/account", userController.getUserAccount);

    //user routers
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    // roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);


    //group routes
    router.get("/group/read", groupController.readFunc);


    return app.use("/api/v1/", router);
}
export default initApiRoutes;