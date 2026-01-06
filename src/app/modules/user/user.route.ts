import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validationMiddleware";
import { createUserSchema } from "./user.validation";


const router = Router()

router.post("/register", validateRequest(createUserSchema), UserController.createUser);
router.get("/all-users", UserController.getAllUser);

export const userRoutes = router;