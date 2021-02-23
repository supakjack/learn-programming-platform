const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
require("dotenv").config();

const userRoute = require("./routers/user.router");
const assignmentRoute = require("./routers/assignment.router");
const courseRoute = require("./routers/course.router");
const tagRoute = require("./routers/tag.router");
const ideRoute = require("./routers/ide.router");
const problemRoute = require("./routers/problem.router");
const homeworkRoute = require("./routers/homework.router");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const app = express();

// app.use(upload.array());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/user", userRoute);
app.use("/assignment", assignmentRoute);
app.use("/course", courseRoute);
app.use("/tag", tagRoute);
app.use("/ide", ideRoute);
app.use("/problem", problemRoute);
app.use("/homework", homeworkRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
