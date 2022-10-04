
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const Admin = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        validate(email) {
            if (!validator.isEmail(email)){
                throw new Error("Invalid Email");
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required:true
       } 
    }]
});

Admin.methods.createToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (err) {
        res.send(`Toekn err ${err}`)
    }
}

const Admin_Data = new mongoose.model("Admin_Detail", Admin);
module.exports = Admin_Data;