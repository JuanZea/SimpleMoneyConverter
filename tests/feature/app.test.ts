import { agent } from 'supertest'
import { accessApp } from '../../app'

describe('App', () => {
    it('The endpoint is enabled', async () => {
        const response = await agent(accessApp).get('/')

        expect(response.ok).toBeTruthy()
        expect(response.header['content-type']).toEqual('text/html; charset=UTF-8')
    })
});
