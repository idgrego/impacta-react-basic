import React from "react";
import { Link, useNavigate } from "react-router";
import * as service from 'app/services/role.service'
import type { Role } from "~/models/role";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";

export default function RoleListPage() {

    const navigate = useNavigate()

    const [roles, setRoles] = React.useState<Role[]>([])

    React.useEffect(() => {
        service.list()
            .then((data: Role[]) => setRoles(data))
            .catch(err => {
                setRoles([])
                if (err instanceof LoginIsRequiredError || err.status === 401)
                    navigate('/')
            })
    }, [])

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">

                <header className="flex justify-between items-center p-6 bg-blue-600 text-white border-b border-blue-700">
                    <span className="text-3xl font-bold">List of roles</span>

                    <span>
                        <Link to="/users"
                            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:scale-[1.03]"
                        >Users</Link>&nbsp;
                        <Link to="create"
                            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:scale-[1.03]"
                        >➕ Add role</Link>
                    </span>
                </header>

                <div className="p-6 space-y-3">
                    {
                        roles?.map((u: Role, idx: number) => {
                            return (
                                <div
                                    key={u.id} // Chave essencial em listas no React
                                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                >
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 w-16">ID: {u.id}</span>
                                        <span className="text-lg font-semibold text-gray-900">{u.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="icon-button text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Edit role" onClick={() => navigate(`/roles/edit/${u.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button className="icon-button text-red-600 hover:text-red-800 transition-colors duration-200" title="Delete role" onClick={() => navigate(`/roles/delete/${u.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.033C6.91 2.75 6 3.66 6 4.834v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <footer className="p-6 bg-gray-100 text-gray-600 text-sm border-t border-gray-200">
                    {roles?.length ?
                        (roles?.length > 1
                            ? `There are ${roles?.length} records`
                            : `There is ${roles?.length} record`)
                        : 'No records'}
                </footer>

            </div>
        </main>
    );
}