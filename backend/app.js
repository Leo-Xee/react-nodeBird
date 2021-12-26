const express = require("express");
const cors = require("cors");
const db = require("./database/models");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
