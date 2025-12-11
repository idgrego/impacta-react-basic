import type { User } from "~/models/user"

const KEY_LOGGED_USER = 'AUTH@LOGGED_KEY'
const BASE_URL_API = 'http://localhost:3030'


function setLoggedUser(user: User) {
    sessionStorage.setItem(KEY_LOGGED_USER, JSON.stringify(user))
}

export function getLoggedUser() {
    const json = sessionStorage.getItem(KEY_LOGGED_USER)
    if (json) return JSON.parse(json) as User
    return null
}

export async function login(username: string, password: string) {
    const result = await fetch(`${BASE_URL_API}/auth/login`, {
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'post'
    })

    if (result.ok) {
        const data = await result.json()
        if (data) {
            setLoggedUser(data as User)
            return true
        }
    }
    return false
}