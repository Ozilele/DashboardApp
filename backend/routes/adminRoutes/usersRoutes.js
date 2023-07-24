import express from "express";
import { getUsers, addUser, deleteUser } from "../../controllers/admin/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);

export default router;