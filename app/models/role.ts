export interface Role {
    name: string
    description: string
    id?: number

    // utilizado no formulário de usuários (cadastro e edição)
    isAssigned?: boolean
}