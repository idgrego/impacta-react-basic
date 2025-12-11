export interface User {
    name: string
    username: string

    id?: number
    password?: string
    roles?: string[]
    token?: string
}