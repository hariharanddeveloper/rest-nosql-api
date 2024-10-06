const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            minlength: [1, "Name cannot be empty."],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Email must be a valid email address."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [6, "Password must be at least 6 characters long."],
        },
        createdAt: {
            type: Date,
            required: [true, "createdAt is required."],
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            required: [true, "updatedAt is required."],
            default: Date.now,
        },
    },
    {
        timestamps: true,
        collection: "Users",
    }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
