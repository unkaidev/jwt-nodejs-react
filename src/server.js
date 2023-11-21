require("dotenv").config();

import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import configCors from "./config/cors";
import { createJWT, verifyToken } from "./middleware/JWTAction"
import cookieParser from 'cookie-parser'


// import connection from "./config/connectDB";
const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app)

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test-connect db
// connection();

//config cookie-parser
app.use(cookieParser())

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 NOT FOUND')
})
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})