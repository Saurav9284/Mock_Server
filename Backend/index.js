const express = require('express')
const cors = require('cors')
const { connection , PORT } = require('./Config/db')
const {userController} = require("./routes/user.routes")
const {authentication} = require("./middlewares/auth")
const {todoController} = require("./routes/todo.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/user",userController)
app.use(authentication)
app.use("/todo",todoController)

app.listen(PORT, async ()=> {
    try {
        await connection
        console.log("Connected to monoDB successfully")
    } catch (error) {
        console.log("Not connected")
        console.log(error)
    }
    console.log(`listening on,${PORT}`);
})