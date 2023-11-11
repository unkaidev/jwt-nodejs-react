import express from "express";

/**
 * 
 * @param app -express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("views", "./src/views");
    app.use(express.static("./src/public"));
}
export default configViewEngine;