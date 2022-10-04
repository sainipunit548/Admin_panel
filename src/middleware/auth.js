const jwt = require("jsonwebtoken");
const Admin_Data = require("../models/admin");

const auth = async (req, res,next) => {
    try {
        const token = req.cookies.jwt;

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const user = await Admin_Data.findOne({ _id: verifyToken._id });
        // console.log(user);
        // console.log(verifyToken);
        next();

    } catch (err) {
        res.status(404).send(err);
        
    }
}
module.exports = auth
