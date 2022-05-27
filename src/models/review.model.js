const {Schema, model} = require("mongoose")

const titleRegex = new RegExp("[a-zA-Z]") 
const commentRegex = new RegExp("[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")

const reviewSchema = new Schema({
    title:{
        type: String,
        required: true,
        maxlength:[20, "too long title"],
        match: [titleRegex, "invalid title"]
    },
    comment:{
        type: String,
        required: true,
        maxlength:[50, "too long comment"],
        match: [commentRegex, "invalid comment"]
    
},
    score: {
        type: Number,
        required: true,
        min: [1, "invalid score"],
        max:[5, "invalid score"],
    } ,
}, { timestamps: true }
);

const Review = model("Review", reviewSchema);

module.exports = Review;