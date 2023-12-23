import express from "express";
const router = express.Router();

import { signin, signup, deleteUser, updateUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

router.patch("/:id", updateUser); 
router.delete("/:id", deleteUser);

export default router;
