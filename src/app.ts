import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import redis from "redis";
import store from "connect-redis";

const app = express();
const RedisStore = store(session);
const RedisClient = redis.createClient();

app.set("views", path.join(__dirname, "static"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        store: new RedisStore({ client: RedisClient }),
        resave: false,
        saveUninitialized: true,
        secret: "THISHIHFEFNWLF@",
    }),
);

import router from "./api/index.route";
app.use("/", router);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err: createError.HttpError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page

    res.status(err.status || 500);
    res.send(err.message);
});
export default app;
