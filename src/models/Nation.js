const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Nation = new Schema({
    name:  {type:String},
    avatar:{type:String},
    slug:{type:String,slug:"name",unique:true},
});

module.exports=mongoose.model('Nation',Nation)