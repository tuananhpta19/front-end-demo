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
UserModel.find().populate('idComment').then(function(data){
    console.log(data);
})





















