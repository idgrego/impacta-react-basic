import type { User } from "~/models/user"
import * as accountService from 'app/services/account.service'
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError"

const BASE_URL_API = 'http://localhost:3030'

function getHeaders() {
    const token = accountService.getLoggedUser()?.token
    if (!token) throw new LoginIsRequiredError()
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export async function list() {
    const result = await fetch(`${BASE_URL_API}/users`, {
        headers: getHeaders(),
        method: 'get'
    })

    return await result.json() as User[]
}