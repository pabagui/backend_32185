import { findEmail } from "../../maestros/usuarioMaestro";
import { logger } from "../../logger/pino";


export async function userInfo({ body }, res) {
        const { email } = body
        try {
        let user = await findEmail(email)
        if (!user) throw new Error('error en usuario')
        return res.json(user)
        } catch (e) {
        logger.error(e)
        return res.json({ error: e.message })
        }
    }