const mongoose = require('mongoose');
const { type } = require('os');
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
        enum: ["admin", "user"],
        default: "user"
    },
    position: {
        type: String
    },
    customPermissions: { type: [String], default: [] },
    avatar: {
        type: String,
        default: '/images/default-avatar.png', // Provide a default avatar image
    }
    
},
    {
        timestamps: true,
    });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
