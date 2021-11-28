import { Request, Response } from "express";

export default {
    convert: (req: Request, res: Response) => {

        res.send({
            result: {pe:3,pa:3}
        })
    }
}
