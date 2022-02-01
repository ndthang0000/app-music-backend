const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name:String,
    email:String,
    username:{type:String,unique:true},
    password:{type:String},
    photoURL:String,
    uid:String,
    listSongLove:[{type:Schema.Types.ObjectId,ref:'Song'}]
});

module.exports=mongoose.model('User',User)