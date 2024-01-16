import express from "express";
import indexRouter from "./routes/index.router.js"
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { errorHandler } from "./middlewares/errorHanlder.js";

import { connectionString, initMongoDB } from "./daos/mongodb/connection.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./passport/local-strategy.js";
import "./passport/github-strategy.js";
import passport from "passport";
import { port } from "./config/config.js";
//////////////////////////////////////////////////////////////

const persistence = "MONGO";
const PORT = port;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log("Server corriendo en puerto ", PORT);
});
if (persistence === "MONGO") await initMongoDB();

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    ttl: 600,
    crypto: {
      secret: "1234",
    },
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000,
  },
};
app.use(cookieParser());
app.use(session(mongoStoreOptions));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);

