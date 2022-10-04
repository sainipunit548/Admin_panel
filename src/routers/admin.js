
const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const conn = require("../db/conn");
const router = express.Router();
const auth = require("../middleware/auth");

// for use middleware 
const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        res.redirect("/");
    }
}
router.get("/", async (req, res) => {
    res.render("admin/login");
})


router.get("/register", async (req, res) => {
    res.render("admin/register");
})

router.post("/register_create", async (req, res) => {

    try {
        const password = await bcrypt.hash(req.body.password, 10);
        req.body.password = password;
        const admin_data = new Admin(req.body);

        const token = await admin_data.createToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now()+50000),
            httpOnly:true
        }) 
        // console.log("Your token is" + token);
        await admin_data.save();
        res.redirect("/");
    } catch(err) {
        res.send(err);
    }

})

router.post("/login_create", async (req, res) => {
    try {
        const data = await Admin.findOne({ username: req.body.username });
        // console.log(data);
        const token = await data.createToken();            // for genrate token
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 50000),
            httpOnly: true
        });
        if (!data) {
            res.redirect("/");
        }
        else
        {
        const password_match = await bcrypt.compare(req.body.password, data.password)

        if (password_match)
        {
            req.session.isAuth = true;          // for use session store
            req.session.Alldata = data;        // Pass data in the sessions
                                           
            res.render("admin/index");
        }
        else {
            res.redirect("/");
        }
        }
       } catch (err) {
        res.send(err);
    }
})

router.get("/index", isAuth, async (req, res) => {
    res.render("admin/index",{AllData:req.session.Alldata});
})


router.get("/logout", async(req, res)=> {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
   })
})

router.get("/user_profile",auth,async (req, res) => {
    res.render("admin/user_profile",{AllData:req.session.Alldata});
})

module.exports = router;