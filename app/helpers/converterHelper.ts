import 'dotenv/config'
import axios from "axios"
import currencies from "../fixtures/currencies"
const freeApiUrl = process.env.APP_FREE_API_URL
const freeApiKey = process.env.APP_FREE_API_KEY

export const validate = (data: { from: string, to: string, amount: number, date?: string }): string => {
    if (!currencies.includes(data.from)) return "The 'from' currency is invalid or not supported"
    if (!currencies.includes(data.from)) return "The 'to' currency is invalid or not supported"
    if (data.amount < 0) return 'The amount must be positive'
    if (data.date && !/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(data.date)) return 'The date is invalid'
}

export const convert = async (data: { from: string, to: string, amount: number, date?: string }): Promise<number> => {
    if (data.date) return convertWithDate({ from: data.from, to: data.to, amount: data.amount, date: data.date })
    else return convertWithoutDate(data)
}

const convertWithDate = (data: { from: string, to: string, amount: number, date: string }): number => {
    return 12345
}

const convertWithoutDate = async (data: { from: string, to: string, amount: number }): Promise<number> => {
    const rate = await axios.get(`${freeApiUrl}convert?q=${data.from}_${data.to}&compact=ultra&apiKey=${freeApiKey}`)
    return rate.data[`${data.from}_${data.to}`]*data.amount
}
