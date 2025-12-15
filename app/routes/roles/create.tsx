import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as service from 'app/services/role.service'
import type { Role } from "~/models/role";
import { useNavigate } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";

export default function RoleCreatePage() {
    const [errorForm, setErrorForm] = useState('');
    const navigate = useNavigate()

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorForm('')

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const description = formData.get("description");

        service.create({ name, description } as Role)
            .then((data: Role) => navigate('/roles'))
            .catch(err => {
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
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
                    Add role
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    <InputField id="name" name="name" placeholder="Name" required />
                    <InputField id="description" name="description" placeholder="Description" required />

                    {errorForm && <p className="text-red-500 text-sm mt-1">{errorForm}</p>}

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <span></span>

                        <button
                            type="reset"
                            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md"
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}