
const mongoose = require("mongoose");
const Exam = mongoose.Schema({
    exam_name: {
        type: String,
        required: true
    },
    exam_date: {
        type: String,
        required: true,
    },
    exam_time: {
        type: String,
        required: true
    },
});


const Exam_Data = new mongoose.model("Exam_Data", Exam);
module.exports = Exam_Data;