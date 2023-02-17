const express=require("express")

const connection=require("./db")

const {userRouter} =require("./Routes/User.routes")

const {authenticate} =require("./Middleware/authenticate.middleware")

const { NoteRouter } = require("./Routes/Note.route")

const cors=require("cors")


require("dotenv").config()


const app=express()

app.use(cors)

app.use(express.json())


let initialData=`welcome to notes app backend 🥳.\nPlease refer to the below 👇 link for proper understanding. ${`https://github.com/blackcode1996/notes_backend/blob/main/README.md`}\n Happy coding`

app.get("/",(req,res)=>{
    res.send(initialData)
})

app.use("/user",userRouter)

app.use("/notes",authenticate,NoteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Server is runing at port 8090")
})