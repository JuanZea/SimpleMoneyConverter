import { Request, Response } from 'express';
import { validate, convert } from '../helpers/converterHelper'

export default {
    convert: async (req: Request, res: Response) => {

        let status: number = 200
        const response: {[index: string]: any } = {}
        const params: { [index: string]: string|number, from: string, to: string, amount: number, date: string} = {
            from: req.params.from,
            to: req.params.to,
            amount: parseInt(req.params.amount, 10),
            date: req.params.date
        }

        const error: string = validate(params)
        if (error) {
            status = 400
            response.message = error
        } else {
            response[req.params.from] = parseInt(req.params.amount, 10)
            response[req.params.to] = await convert(params)
        }

        res.send(response).status(status)
    }
}
