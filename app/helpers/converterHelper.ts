import 'dotenv/config'
import axios from "axios"

const freeApiUrl = process.env.APP_FREE_API_URL
const freeApiKey = process.env.APP_FREE_API_KEY

const monthlyApiUrl = process.env.APP_MONTHLY_API_URL
const monthlyApiKey = process.env.APP_MONTHLY_API_KEY

export const convert = async (data: { from: string, to: string, amount: number, date?: string }): Promise<number> => {
    if (data.date) return convertWithDate({from: data.from, to: data.to, amount: data.amount, date: data.date})
    else return convertWithoutDate(data)
}

export const convertCollection = async (isValid: boolean, data: { from: string, to: string, amount: number, date?: string }[]): Promise<object[]> => {
    const results: any[] = []
    if (isValid) for (const request of data) {
        results.push({
            [request.from]: request.amount,
            [request.to]: await convert(request)
        })
        if (request.date) results.at(-1).date = request.date
    }
    else {
        for (const request of data) {
            if (!Array.isArray(request)) {
                results.push({
                    [request.from]: request.amount,
                    [request.to]: await convert(request)
                })
                if (request.date) results.at(-1).date = request.date
            }
            else results.push(request)
        }
    }
    return results
}

const convertWithDate = async (data: { from: string, to: string, amount: number, date: string }): Promise<number> => {
    const rate = await axios.get(`${monthlyApiUrl}${data.date}?access_key=${monthlyApiKey}&format=1`)
    return (rate.data.rates[data.to]/rate.data.rates[data.from]) * data.amount
}

const convertWithoutDate = async (data: { from: string, to: string, amount: number }): Promise<number> => {
    const rate = await axios.get(`${freeApiUrl}convert?q=${data.from}_${data.to}&compact=ultra&apiKey=${freeApiKey}`)
    return rate.data[`${data.from}_${data.to}`] * data.amount
}
