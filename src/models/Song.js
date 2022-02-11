const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Song = new Schema({
    name:  String,
    source:String,
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    singerName:String,
    des:String,
    love:{type:Number,default:0},
    view:{type:Number,default:0},
    duration:Number,
    avatar:String,
    slug:{type:String,slug:"name",unique:true},
    nation:{type:Schema.Types.ObjectId,ref:'Nation',default:null},
},{timestamps:true});

module.exports=mongoose.model('Song',Song)