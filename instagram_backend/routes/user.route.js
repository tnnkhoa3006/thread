import { Router } from "express";
const router = Router();

import { register, login, logout, getProfile, editProfile, followOrunfollow, getSuggestedUsers } from "../constrollers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated ,getProfile);
router.route("/profile/edit").post(isAuthenticated, upload.single("ProfilePicture") , editProfile);
router.route("/followorunfollow/:id").post(isAuthenticated ,followOrunfollow);
router.route("/suggested").get(isAuthenticated ,getSuggestedUsers);

export default router;