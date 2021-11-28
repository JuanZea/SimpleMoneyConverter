import { Request, Response } from 'express';
import { validate, validateCollection, convert, convertCollection } from '../helpers'

export default {
    convert: async (req: Request, res: Response) => {
        let status: number = 200
        let response: { [index: string]: string|string[]|number } = {}

        const [isValid, data, errors] = validate(req.params)
        if (isValid) response = { [data.from]: data.amount, [data.to]: await convert(data) }
        else { status = 400; response.messages = errors }

        res.send(response).status(status)
    },

    multiConvert: async (req: Request, res: Response) => {
        let status: number = 200
        const response: {[index: string]: object[], results: object[] } = { results: [] }

        const [isValid, data] = validateCollection(req.body)

        response.results = await convertCollection(isValid, data)

        res.send(response).status(status)
    }
}
