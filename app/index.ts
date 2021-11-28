import { app } from "./app";
const port = process.env.SERVER_PORT

app.listen( port, (): void => {
    // tslint:disable-next-line:no-console
    console.log( `Server started on port: ${ port }` )
} );
