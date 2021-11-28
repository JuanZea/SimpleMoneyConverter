import { app } from "./app";
const port = process.env.SERVER_PORT

const server = app.listen(port, (): void => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port: ${port}`)

    if (process.env.NODE_ENV === 'test') {
        server.close(() => {
            // tslint:disable-next-line:no-console
            console.log('Server closed');
        });
    }
});

export { app as accessApp }
