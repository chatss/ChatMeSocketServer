import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import path from "path";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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
