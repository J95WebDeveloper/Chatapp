import Conversation from "../schemas/conversationSchema.js";
import Message from "../schemas/messageSchema.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message({ senderId, receiverId, message });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // socket io
    const socketId = getReceiverSocketId(receiverId);
    if (socketId) {
      io.to(socketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(501).json({
      message: "send message internal server error",
      error: error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: usertochat } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, usertochat] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(201).json(conversation.messages);
  } catch (error) {
    res.status(501).json({
      message: "get message internal server error",
      error: error.message,
    });
  }
};

export default { sendMessage, getMessage };
