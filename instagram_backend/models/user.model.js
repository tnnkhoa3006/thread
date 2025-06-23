import mongoose, { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    ProfilePicture: {type: String, default: ""},
    bio:{type: String, default: ""},
    gender:{type: String, enum: ["male", "female", "other"], default: "other"},
    followers: [{type: _Schema.Types.ObjectId, ref: "User"}],
    following: [{type: _Schema.Types.ObjectId, ref: "User"}],
    posts: [{type: _Schema.Types.ObjectId, ref: "Post"}],
    bookmarks: [{type: _Schema.Types.ObjectId, ref: "Post"}],
}, {timestamps: true});

export default model("User", userSchema);