
const mongoose = require("mongoose");
const Question = mongoose.Schema({
    select_subject: {
        type: String,
        required: true
    },
    question_name: {
        type: String,
        required: true,
    },
    option_1: {
        type: String,
        required: true,
    },
    option_2: {
        type: String,
        required: true,
    },
    option_3: {
        type: String,
        required: true,
    },
    option_4: {
        type: String,
        required: true,
    },
    
    correct_option: {
        type: String,
        required: true
    },
});


const Question_Data = new mongoose.model("Question_Data", Question);
module.exports = Question_Data;