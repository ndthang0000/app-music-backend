const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name:String,
    email:String,
    photoURL:String,
    uid:String,
    listSongLove:[{type:Schema.Types.ObjectId,ref:'Song'}]
},{timestamps:true});

module.exports=mongoose.model('User',User)