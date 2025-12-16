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

    return await handleResponse<User[]>(result)
}

export async function get(id: number) {

    const result = await fetch(`${BASE_URL_API}/users/${id}`, {
        headers: getHeaders(),
        method: 'get'
    })

    return await handleResponse<User>(result)
}

export async function create(obj: User) {
    const result = await fetch(`${BASE_URL_API}/users`, {
        headers: getHeaders(),
        method: 'post',
        body: JSON.stringify(obj)
    })

    return await handleResponse<User>(result)
}

export async function edit(obj: User) {
    const result = await fetch(`${BASE_URL_API}/users/${obj.id}`, {
        headers: getHeaders(),
        method: 'put',
        body: JSON.stringify(obj)
    })

    return await handleResponse<User>(result)
}

export async function del(id: number) {
    const result = await fetch(`${BASE_URL_API}/users/${id}`, {
        headers: getHeaders(),
        method: 'delete'
    })

    return await handleResponse<boolean>(result)
}

async function handleResponse<T>(result: Response) {
    const data = await result.json()
    if (result.ok) return data as T
    if (result.status === 401) throw new LoginIsRequiredError()
    throw new Error(data.message)
}