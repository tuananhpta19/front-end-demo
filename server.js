require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use("/public",express.static('public'))
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./index.html"))
})

app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "./login.html"))
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("kết nối db thành công");
});
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    idComment: [{
        type: String,
        ref: 'comment'
    }]
})

var CommentSchema = new Schema({
    content: String
})

var UserModel = mongoose.model("user", UserSchema);
var CommentModel = mongoose.model("comment", CommentSchema);




app.get("/user", function(req, res){
    UserModel.find().populate('idComment').then(function(data){
        res.json({
            message: "hiển thị dữ liệu thành công",
            data: data
        })
    })
  
})

app.post("/login", function(req, res){
    let {username, password} = req.body;
    if(username === "ta" && password === "1"){
        return res.json({
            error: false,
            status: 200,
            message: 'Login thanh cong'
        })
    }
    return res.status(400).json({
        error: true,
        status: 400,
        message: 'Sai tên đăng nhập hoặc mật khẩu'
    })
})

app.listen(process.env.PORT, function(){
    console.log("ban dang ket tai cong: "+ process.env.PORT);
});