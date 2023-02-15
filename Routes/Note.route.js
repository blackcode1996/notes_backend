const express=require("express")

const {NoteModel}=require("../model/Note.model")

const NoteRouter=express.Router()

NoteRouter.get("/",async(req,res)=>{
    // res.send("ALL THE NOTES")
    const user=req.body.user
    try {
        const notes=await NoteModel.find({user})
        res.send(notes)
    } catch (error) {
        res.send(error.message)
    }
})

NoteRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"Note Created"})
})

module.exports={
    NoteRouter
}