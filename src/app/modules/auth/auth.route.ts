import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.createNewAccessToken);
router.post("/logout", AuthController.logout);

export const authRoutes = router;