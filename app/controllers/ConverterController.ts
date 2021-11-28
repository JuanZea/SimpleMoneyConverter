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
    },

    multiConvert: async (req: Request, res: Response) => {
        let status: number = 200
        const response: {[index: string]: object[], results: object[] } = { results: [] }
        const body: { [index: string]: object[], requests: { [index: string]: string|number, from: string, to: string, amount: string, date: string }[] } = {
            requests: req.body.requests
        }

        for (const reqParams of body.requests) {
            const params: { [index: string]: string|number, from: string, to: string, amount: number, date: string } = {
                from: reqParams.from,
                to: reqParams.to,
                amount: parseInt(reqParams.amount, 10),
                date: reqParams.date
            }

            const error: string = validate(params)
            if (error) {
                status = 400
                response.results.push({ message: error })
            } else {
                response.results.push({
                    [params.from]: params.amount,
                    [params.to]: await convert(params)
                })
            }
        }

        res.send(response).status(status)
    }
}
