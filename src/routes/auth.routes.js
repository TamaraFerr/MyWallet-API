import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cadastroSchema } from "../schemas/auth.schemas.js";
import { cadastro } from "../controllers/auth.controllers.js";

const authRouter = Router()

authRouter.post("/cadastro", validateSchema(cadastroSchema), cadastro)
authRouter.post("/login")
authRouter.post("/logout")

export default authRouter