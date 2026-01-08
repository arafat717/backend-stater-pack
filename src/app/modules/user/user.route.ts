import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validationMiddleware";
import { createUserSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../utils/jwt";

const router = Router()

router.post("/register", validateRequest(createUserSchema), UserController.createUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUser);

export const userRoutes = router;