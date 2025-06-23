import { Router } from "express";
const router = Router();
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { sendMessage, getMessages } from "../constrollers/message.controller.js";
import upload from "../middlewares/multer.js";

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/all/:id").get(isAuthenticated, getMessages);

export default router;