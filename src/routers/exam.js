
const express = require("express");
const Exam_Data = require("../models/exam");
const conn = require("../db/conn");
const router = express.Router();

//  Router Start Of Examinations 

router.get("/add_exam", async (req, res) => {
    res.render("exam/add_exam");
})

router.post("/exam_store", async (req, res) => {

    try {
    const exam = new Exam_Data(req.body)
    await exam.save();
    res.redirect("/view_exam");
    }catch (err) {
        res.status(404).send(err);
    }
})


router.get("/view_exam", async (req, res) => {
    try {
        const all_exam_data =  await Exam_Data.find();
        res.render("exam/view_exam",{all_exam_data});
    } catch (err) {
        res.send(err);
    }
})


router.get("/exam_edit", async (req, res) => {
    try {
        const exam_edit = await Exam_Data.findById(req.query.id);
        res.render("exam/edit_exam", { exam_edit })

    } catch (err) {
        res.send(err);
    }
})


router.post("/exam_update/:id", async (req, res) => {
    try {
        console.log(req.body);
        const exam_update = await Exam_Data.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/view_exam");
    } catch (err) {
        res.send(err)
    }

})

router.get("/exam_delete/:id", async(req,res) => {
    try{
        const exam_delete = await Exam_Data.findByIdAndDelete(req.params.id);
        if (!exam_delete) {
            res.send("Delete Id Not Found");
        }
        res.redirect("/view_exam");

    }catch(err) {
        res.send(err);
    }

})

// Router End Of Examinations

module.exports = router;