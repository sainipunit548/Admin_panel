const express = require("express");
const Question_Data = require("../models/question");
const Exam_Data = require("../models/exam");
const conn = require("../db/conn");
const router = express.Router();


//Router Start From Question Managers

router.get("/add_question", async (req, res) => {
    const exams =  await Exam_Data.find();
    res.render("question/add_question",{exams});
})


router.post("/questions_store", async (req, res) => {
    try {
        const question_store = new Question_Data(req.body);
        await question_store.save();
        res.redirect("/view_questions");
        
    } catch (err) {
        res.send(err);
    }
})

router.get("/view_questions", async (req, res) => {
    try {
        // const questions_data = await Question_Data.find();
       
        res.redirect("/search_exam");

    } catch (err) {
        res.send(err);
    }
})

router.get("/edit_question", async (req, res) => {
    try {
        const exams =  await Exam_Data.find();
        const question_data = await Question_Data.findOne({ _id:req.query.id })
        res.render("question/edit_question", { exams, question_data });  
    } catch (err) {

        res.send(err);
    }
})


router.post("/update_questions/:id", async (req, res) => {
    try {
        const question_update = await Question_Data.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("question/view_questions");

    } catch (err) {
        res.send(err);
    }
})


router.get("/question_delete/:id", async (req, res) => {
    try {
        
        const delete_question = await Question_Data.findByIdAndDelete(req.params.id);
        res.redirect("/view_questions");
        
    } catch (err) {
        res.send(err);
    }
})

router.get("/search_exam", async (req, res) => {
    try {
        let condition = {};
        if (req.query.select_subject) {
            condition.select_subject = req.query.select_subject;
        };
        const questions_data  = await Question_Data.find(condition);
        const exams =  await Exam_Data.find();
        console.log(questions_data  );
        res.render("question/view_question",{questions_data ,exams});
        
    } catch (err) {
        console.log(err);   
        res.send(err);
        
    }
})


// Router End of Question Managers

module.exports = router;