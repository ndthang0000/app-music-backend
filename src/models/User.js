const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name:String,
    email:String,
    photoURL:String,
    uid:String,
    story:{type:String,default:'Chưa cập nhật'},
    listSongLove:[{type:Schema.Types.ObjectId,ref:'Song'}],
    listFollow:[{type:Schema.Types.ObjectId,ref:'User'}],
    quantityFollower:{type:Number,default:0}
},{timestamps:true});

module.exports=mongoose.model('User',User)