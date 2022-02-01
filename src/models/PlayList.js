const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const PlayList = new Schema({
    name:  {type:String,default:'Mặc định'},
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    listSong:[{type:Schema.Types.ObjectId,ref:'Song'}],
    isPublic:{type:Boolean,default:true},
    avatar:{type:String,default:'/img/playlist.png'},
    slug:{type:String,slug:"name",unique:true}
},{timestamps:true});

module.exports=mongoose.model('PlayList',PlayList)