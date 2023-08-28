import dayjs from "dayjs"
import {db} from "../database/database.connection.js"


export async function criarTransicao(req, res){
    const {value, description, type} = req.body
    const {usuarioId} = req.locals.sessao

    try {
        const transacao = {value: Number(value), description, type, usuarioId, date: dayjs().valueOf()}
        await db.collection("transacoes").insertOne(transacao)
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function obterTransicoes(req, res){
    const {usuarioId} = req.locals.sessao

    try {
        const transacoes = await db.collection("transacoes").find({usuarioId}).sort({date: -1}).toArray()
        res.send(transacoes)

    } catch (err) {
        res.status(500).send(err.message)
    }
}