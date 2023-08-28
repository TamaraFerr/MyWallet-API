import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"

export async function cadastro(req, res) {
    const {name, email, password} = req.body

    try{
        const usuario = await db.collection("usuarios").findOne({email})
        if (usuario) return res.status(409).send("E-mail já cadastrado!")

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("usuarios").insertOne({name, email, password: hash})
        res.sendStatus(201)

    } catch (err){
        res.status(500).send(err.message)
    }
}