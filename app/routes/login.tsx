import type React from "react";
import InputField from "~/components/input-field"

export default function Login() {
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        // Pega valores por nome
        const username = formData.get("username");
        const password = formData.get("password");
        alert(`${username}, sua senha é ${password}`);
    }

    function changed(e: React.ChangeEvent<HTMLInputElement>) {
        // não entendi a necessidade disso
        console.log('changed', e.target.name, e.target.value, e)
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">LOGIN</h1>
                <form className="space-y-4" onSubmit={submit}>
                    <InputField id="username" name="username" placeholder="Username" required onChange={changed} />
                    <InputField id="password" name="password" placeholder="Password" required onChange={changed} type="password" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Login</button>
                </form>
            </div>
        </main>

    );
}