const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{type:String,requird:true},
    status:{type:String,required:true},
    userId:{type:String,required:true}
})

const todoModel = mongoose.model("todo", todoSchema)

module.exports = {
    todoModel
}