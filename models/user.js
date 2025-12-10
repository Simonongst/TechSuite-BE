const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    eid: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["User", "Editor", "Admin"],
        default: "User",
    },
    isEmployed: {
        type: Boolean,
        required: true,
        default: true,
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
