// import "reflect-metadata";
import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import redis from "redis";
import store from "connect-redis";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
const swaggeryaml = yaml.load("./swagger/swagger.yaml");

const app = express();
const RedisStore = store(session);
const RedisClient = redis.createClient();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggeryaml));
app.use(
    session({
        store: new RedisStore({ client: RedisClient }),
        resave: false,
        saveUninitialized: true,
        secret: "THISHIHFEFNWLF@",
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    }),
);
app.use(cors());

import router from "./api/index.route";
app.use("/", router);

app.use((req, res, next) => {
    next(createError(404));
});

app.use(
    (
        err: createError.HttpError,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};
        // render the error page

        res.status(err.status || 500);
        res.send(err.message);
    },
);
export default app;
