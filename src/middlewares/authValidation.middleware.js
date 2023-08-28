import {db} from "../database/database.connection.js"

export async function authValidation(req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "")
    if(!token) return res.sendStatus(401)

    try{
        const sessoes = await db.collection("sessoes").findOne({token})
        if(!sessoes) return res.sendStatus(401)

        res.locals.sessao = sessoes

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}