import 'dotenv/config'
import currencies from "../fixtures/currencies"

const applyRules = (raw: { from?: string, to?: string, amount?: number, date?: string }, errors: string[]) => {
    if (!raw.from) errors.push("The 'from' param is required")
    if (!raw.to) errors.push("The 'to' param is required")
    if (!raw.amount) errors.push("The 'amount' param is invalid")
    if (!currencies.includes(raw.from)) errors.push("The 'from' currency is invalid or not supported")
    if (!currencies.includes(raw.to)) errors.push("The 'to' currency is invalid or not supported")
    if (raw.amount < 0) errors.push('The amount must be positive')
    if (raw.date && !/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/.test(raw.date)) errors.push('The date is invalid')
}

export const validate = (raw: { from?: string, to?: string, amount?: string|number, date?: string }): [boolean, { from: string, to: string, amount: number, date?: string }, string[]] => {
    const errors: string[] = []
    const cleanRaw: { from: string, to: string, amount: number, date?: string } = {
        from: raw.from,
        to: raw.to,
        amount: undefined,
        date: raw.date,
    }
    if (typeof raw.amount === 'string') cleanRaw.amount = parseInt(raw.amount, 10)
    else if (typeof raw.amount === 'number') cleanRaw.amount = raw.amount
    applyRules(cleanRaw, errors)

    return !errors.length ? [true, cleanRaw, undefined] : [false, undefined, errors]
}

export const validateCollection = (raw: { requests: { from: string, to: string, amount: number, date?: string }[] }): [boolean, any[]] => {
    const result: any[] = []
    let withoutErrors = true
    if (raw.requests.length > 100) return [false, [["The limit of simultaneous consultations is 100"]]]
    raw.requests.forEach(request => {
        const [isValid, data, errors] = validate(request)
        if (isValid) result.push(data)
        else {
            result.push(errors)
            withoutErrors = false
        }
    })
    return [withoutErrors, result]
}


