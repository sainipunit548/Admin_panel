const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_PORT)
    .then(() => {
        console.log("Connection Successfully with Database");
    }).catch((err) => {
        console.log(`Connection is Failed ${err}`);
    })