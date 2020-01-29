import express from "express";
import createError from "http-errors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/static/index.html");
});
app.get("/PrivateRoom", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/static/PrivateRoom.html");
});
app.get("/PublicRoom", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/static/PublicRoom.html");
});

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
