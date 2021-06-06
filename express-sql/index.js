import express from "express";

import indexRouter from "./routes/indexRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();
app.use(express.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(5000, () => {
    console.log("Server Online");
});