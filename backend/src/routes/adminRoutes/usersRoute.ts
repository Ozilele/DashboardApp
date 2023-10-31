import express from "express";
import { getUsers, addUser, deleteUser, getUsersCount } from "../../controllers/admin/usersController.js";
import { protectAdminRoute } from "../../middleware/authMiddleware.js";

const router : express.Router = express.Router();

router.get("/", protectAdminRoute, getUsers);
router.get("/count", protectAdminRoute, getUsersCount);
router.post("/", protectAdminRoute, addUser);
router.delete("/:id", protectAdminRoute, deleteUser);

export default router;