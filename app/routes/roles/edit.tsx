import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as service from 'app/services/role.service'
import type { Role } from "~/models/role";
import { useNavigate, useParams } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";

export default function RoleEditPage() {
    const [errorForm, setErrorForm] = useState('');
    const [role, setRole] = React.useState<Role | null>(null)
    const [originalUser, setOriginalUser] = React.useState<Role | null>(null)
    const navigate = useNavigate()
    const { id } = useParams();


    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorForm('')

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const description = formData.get("description");

        service.edit({ id: Number(id), name, description } as Role)
            .then((data: Role) => navigate('/roles'))
            .catch(err => {
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }

    function handleUserChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (role) {
            setRole({ ...role, [name]: value });
        }
    }

    function handleReset() {
        if (originalUser) {
            setRole(originalUser);
        }
    }

    React.useEffect(() => {
        if (!id) return; // Garante que o ID existe antes de fazer a chamada

        service.get(Number(id))
            .then((data: Role) => {
                setRole(data);
                setOriginalUser(data); // Salva o estado original
            })
            .catch(err => {
                setRole(null)
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }, [])

    if (!role) {
        return <p className="text-red-500 text-sm mt-1">Role not found</p>
    }

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6 border border-gray-200">
                <button
                    type="button"
                    onClick={() => navigate('/roles')}
                    className="icon-button absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Cancel and go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-3xl font-extrabold text-gray-900 text-center border-b pb-4">
                    Edit role
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    <InputField id="name" name="name" placeholder="Name" required value={role.name} onChange={handleUserChange} />
                    <InputField id="description" name="description" placeholder="Description" required value={role.description} onChange={handleUserChange} />

                    {errorForm && <p className="text-red-500 text-sm mt-1">{errorForm}</p>}

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <span></span>

                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md"
                            onClick={handleReset}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.695v-4.992m0 0h-4.992m4.992 0l-3.181-3.183a8.25 8.25 0 00-11.664 0l-3.181 3.183" />
                            </svg>
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-[1.01]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}