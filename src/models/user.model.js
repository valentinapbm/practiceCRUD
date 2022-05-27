const {Schema, model, models} = require("mongoose")

const emailRegex = new RegExp("[a-zA-Z0-9]{5,}@[a-z]{2,}.[a-z]{2,3}?") 
const passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}")
const nameRegex = new RegExp("[a-zA-Z]")
const phoneRegex = new RegExp("[+][0-9 _]*[0-9][0-9 _]{11}$")

const userSchema = new Schema({
    rol:{
        type: String,
        required: true,
        enum: {
            values:["admin", "superAdmin", "user"],
            message: "invalid rol",
        }
    },
    email:{
        type: String,
        required: true,
        match: [emailRegex, "invalid email"],
        validate: [{
            validator(value){
                return models.User.findOne({email:value})
                .then((user)=>!user)
                .catch(()=>false)
            },
            message:"email already exist",
        }]
},
    password: {
        type: String,
        required: true,
        minlength: [8, "password too short"],
        match:[passRegex, "your password is not secure"]
    } ,
    name:{
        type: String,
        required: true,
        match: [nameRegex, "your name shouldn't contain numbers"],
        maxlength:[10, "name too long"]

    },
    phone:{
        type:String,
        required: true,
        match: [phoneRegex, "your phone number shouldn't contain letters"]
        
    },
}, { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;