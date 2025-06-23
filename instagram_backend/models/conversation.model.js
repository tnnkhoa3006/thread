import { Schema, model } from "mongoose";

const conversationSchema = new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: "User"}],
    message: [{type: Schema.Types.ObjectId, ref: "Message"}],
}, {timestamps: true});

export default model("Conversation", conversationSchema);