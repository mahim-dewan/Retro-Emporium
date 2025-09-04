const { default: mongoose, model } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
},{timestamps:true})

 const SubCategory = mongoose.models.SubCategory || model("SubCategory",subCategorySchema)

 export default SubCategory