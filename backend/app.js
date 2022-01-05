const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");

const morgan = require("morgan");
const db = require("./database/models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");

const app = express();
dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // true이면 쿠키도 전달 가능
  }),
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
