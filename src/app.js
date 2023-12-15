import express from "express";
import userRouter from "./routes/user.router.js";
import productsRouter from "./routes/products.router.js";
import viewRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { errorHandler } from "./middlewares/errorHanlder.js";
import { Server } from "socket.io";
import * as service from "./services/chat.service.js";
import { connectionString, initMongoDB } from "./daos/mongodb/connection.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./passport/local-strategy.js";
import "./passport/github-strategy.js";
import passport from "passport";
//////////////////////////////////////////////////////////////

const persistence = "MONGO";
const PORT = 8080;
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

const socketServer = new Server(httpServer);
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

/////////////////////////////
app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////

//////////////// Routes  ///////
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/", viewRouter);

let usuariosConectado = [];

socketServer.on("connection", async (socket) => {
  // socketServer.emit("usuariosConectados",usuariosConectado)
  console.log("🟢 ¡New connection!", socket.id);
  socketServer.emit("messages", await service.getAll());

  socket.on("disconnect", () => {
    console.log("🔴 ¡User disconnect!", socket.id);
    const sockeidBuscado = socket.id;
    usuariosConectado = usuariosConectado.filter(
      (e) => e.socketID !== sockeidBuscado
    );
    socketServer.emit("usuariosConectados", usuariosConectado);
  });
  socket.on("newUser", (user) => {
    console.log(`⏩ ${user} inició sesión`);
    usuariosConectado.push(user);
    socketServer.emit("usuariosConectados", usuariosConectado);
  });

  socket.on("chat:message", async (msg) => {
    await service.createMessage(msg);
    socketServer.emit("messages", await service.getAll());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});

export default socketServer;
