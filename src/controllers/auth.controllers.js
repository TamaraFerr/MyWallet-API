import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

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

export async function login(req, res) {
    const {email, password} = req.body

    try{
        const usuario = await db.collection("usuarios").findOne({email})
        if(!usuario) return res.status(401).send("E-mail não existe.")

        const senhaCorreta = bcrypt.compareSync(password, usuario.password)
        if(!senhaCorreta) return res.status(401).send("Senha incorreta.")

        const token = uuid()
        await db.collection("sessoes").insertOne({token, usuarioId: usuario._id})
        res.send({token, usuarioName: usuario.name})

    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function logout(req, res) {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "")
    if(!token) return res.sendStatus(401)

    try{
        const sessoes = await db.collection("sessoes").findOne({token})
        if(!sessoes) return res.sendStatus(401)

        await db.collection("sessoes").deleteOne({token})
        res.sendStatus(200)
    } catch (err){
        res.status(500).send(err.message)
    }
}