const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "secretary", "generalManager", "headofMarket", "user"],
        default: "user"
    },
},
    {
        timestamps: true,
    });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
