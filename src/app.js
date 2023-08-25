import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { MongoClient } from "mongodb"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log("Mongodb foi conectado!")
} catch (err) {
    console.log(err.message)
}

const db = mongoClient.db()

const PORT = 5000
app.listen(PORT, () => console.log(`Eba! Server rodando na porta ${PORT}`))