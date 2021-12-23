const express = require("express");

const app = express();

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use("/user", userRouter);
app.use("/post", postRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
