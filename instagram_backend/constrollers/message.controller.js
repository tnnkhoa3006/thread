import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let conversation = await Conversation.findOne({
            paticipants: {$all: [senderId, receiverId]}
        });

        if (!conversation) { 
            conversation = await Conversation.create({
                paticipants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);

        // soket.io realtime message sending

        return res.status(200).json({
            message: "Message sent successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getMessages = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        
        const conversation = await Conversation.findOne({
            paticipants: {$all: [senderId, receiverId]}
        });

        if (!conversation) {
            return res.status(400).json({
                messages:[],
                success: true
            })
        }
        return res.status(200).json({
            messages: conversation.messages,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}