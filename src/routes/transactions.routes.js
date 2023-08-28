import { Router } from "express"
import { criarTransicao, obterTransicoes } from "../controllers/transactions.crontollers.js"
import { authValidation } from "../middlewares/authValidation.middleware.js"
import {validateSchema} from "../middlewares/validateSchema.middleware.js"
import {transactionsSchema} from "../schemas/transactions.schemas.js"

const transactionRouter = Router()

transactionRouter.post("/transactions", authValidation, validateSchema(transactionsSchema),criarTransicao)
transactionRouter.get("/transactions", authValidation, obterTransicoes)

export default transactionRouter