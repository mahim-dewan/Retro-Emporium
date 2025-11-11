const { default: mongoose, model } = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

 const   Category = mongoose.models.Category || model("Category",categorySchema)

 export default Category