require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT

app.use(session({
    secret: 'TTT',
    resave: false,
    saveUninitialized: false,
}));

app.set("view engine", "ejs");
app.use(cookieParser());

const view_path = path.join(__dirname, "views")
const css_path = path.join(__dirname, "./public");

app.set('views', view_path);

app.use(express.static(css_path));

app.use(express.urlencoded({
    extended:true
}))

const admin_router = require("./routers/admin");
const exam_router = require("./routers/exam");
const question_router = require("./routers/question");

app.use(admin_router);
app.use(exam_router);
app.use(question_router);

app.listen(PORT, () => {
    console.log(`server run on port no ${PORT}`);
})
