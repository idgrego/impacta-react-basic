import type React from "react";
import InputField from "~/components/input-field"

export default function UserCreatePage() {
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        // Pega valores por nome
        const name = formData.get("name");
        const username = formData.get("username");
        const password = formData.get("password");
        const confirm = formData.get("confirm");
        alert(`${username}, sua senha é ${password}`);
    }

    /* function changed(e: React.ChangeEvent<HTMLInputElement>) {
        // não entendi a necessidade disso
        console.log('changed', e.target.name, e.target.value, e)
    } */

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6 border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center border-b pb-4">
                    Add user
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    <InputField id="name" name="name" placeholder="Name" required />
                    <InputField id="username" name="username" placeholder="Username" required />
                    <InputField id="password" name="password" placeholder="Password" required type="password" />
                    <InputField id="confirm" name="confirm" placeholder="Confirm password" required type="password" />

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="reset"
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-[1.01]"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}