import { app } from '../../app/app'
import { agent } from 'supertest'

describe('App', () => {
    it('The endpoint is enabled', async () => {
        const response = await agent(app).get('/')

        expect(response.ok).toBeTruthy()
        expect(response.header['content-type']).toEqual('text/html; charset=UTF-8')
    })
});
