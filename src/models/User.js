const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name:String,
    email:String,
    age:Number,
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    recently:[{type:Schema.Types.ObjectId,ref:'User'}]
});

module.exports=mongoose.model('User',User)