import React from "react";
import { Link, useNavigate } from "react-router";
import * as userService from 'app/services/user.service'
import type { User } from "~/models/user";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";

export default function UserListPage() {

    const navigate = useNavigate()

    const [users, setUsers] = React.useState<User[]>([])

    React.useEffect(() => {
        userService.list()
            .then((data: User[]) => setUsers(data))
            .catch(err => {
                setUsers([])
                if (err instanceof LoginIsRequiredError || err.status === 401)
                    navigate('/')
            })
    }, [])

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">

                <header className="flex justify-between items-center p-6 bg-blue-600 text-white border-b border-blue-700">
                    <span className="text-3xl font-bold">List of users</span>

                    <Link
                        to="create"
                        className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:scale-[1.03]"
                    >
                        ➕ Add user
                    </Link>
                </header>

                <div className="p-6 space-y-3">
                    {
                        users?.map((u: User, idx: number) => {
                            return (
                                <div
                                    key={u.id} // Chave essencial em listas no React
                                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                >
                                    <span className="font-medium text-gray-700">ID: {u.id}</span>
                                    <span className="text-lg font-semibold text-gray-900">{u.name}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <footer className="p-6 bg-gray-100 text-gray-600 text-sm border-t border-gray-200">
                    {users?.length ?
                        (users?.length > 1
                            ? `There are ${users?.length} records`
                            : `There is ${users?.length} record`)
                        : 'No records'}
                </footer>

            </div>
        </main>
    );
}