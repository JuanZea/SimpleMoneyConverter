import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get( "/", ( req: Request, res: Response ): void => {
    res.send( "Hello world!" );
} );

app.listen( port, (): void => {
    // tslint:disable-next-line:no-console
    console.log( `Server started on port: ${ port }` );
} );
