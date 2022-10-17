require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { all } = require("./routers/admin");

const app = express();

app.use(express.json());
const APIPORT = process.env.APIPORT

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



app.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const all_data = name.replace(/[^a-zA-Z0-9]/g, '');
        res.send(all_data);
       
    }catch (err) {
        
    }

})

app.listen(APIPORT, () => {
    console.log(`server run on port no ${APIPORT}`);
})
