import { Outlet } from "react-router";

export default function UsersLayout() {
    return (
        // Este é o container principal que será compartilhado por todas as páginas de usuários.
        // Você pode adicionar um header, sidebar, ou qualquer outro elemento comum aqui.
        <main className="min-h-screen bg-gray-100">
            <Outlet />
        </main>
    );
}