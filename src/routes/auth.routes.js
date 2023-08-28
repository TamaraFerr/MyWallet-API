import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cadastroSchema, loginSchema } from "../schemas/auth.schemas.js";
import { cadastro, login, logout } from "../controllers/auth.controllers.js";

const authRouter = Router()

authRouter.post("/cadastro", validateSchema(cadastroSchema), cadastro)
authRouter.post("/login", validateSchema(loginSchema), login)
authRouter.post("/logout", logout)

export default authRouter