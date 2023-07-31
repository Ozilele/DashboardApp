import express from "express";
import { getUsers, addUser, deleteUser } from "../../controllers/admin/usersController.js";
import { protectAdminRoute } from "../../middleware/authMiddleware.js";

const router : express.Router = express.Router();

router.get("/", protectAdminRoute, getUsers);
router.post("/", protectAdminRoute, addUser);
router.delete("/:id", protectAdminRoute, deleteUser);

export default router;