const {Router} = require('express')
const {todoModel} = require("../models/Todo.model")

const todoController = Router();

todoController.get("/", async (req,res)=>{
    const todo = await todoModel.findOne({userId : req.body.userId})
    res.send(todo)
})

todoController.post("/create", async (req,res)=>{
    const {title,status,userId} = req.body
    const todo = new todoModel({
        title,
        status,
        userId
    })
    try{
        await todo.save();
        res.send({msg: "Todo created"})
    }
    catch(err){
        res.send({msg: "Something went wrong"})
        console.log(err)
    }
});

todoController.delete("/delete/:todoId", async(req,res)=>{
    const {todoId} = req.params
    const deletTodo = await todoModel.findOneAndDelete({_id:todoId, userId: req.body.userId})
    if(deletTodo){
        res.send({msg:"Todo Deleted"})
    }
    else{
        res.send({msg:"Not Deleted"})
    }
});

todoController.patch("/edit/:todoId", async(req,res)=>{
    const {todoId} = req.params
    const editTodo = await todoModel.findOneAndUpdate({_id:todoId, userId: req.body.userId},{...req.body})
    if(editTodo){
        res.send({msg:"Todo Updated"})
    }
    else{
        res.send({msg:"Not Updated"})
    }
});

module.exports = {
    todoController
}