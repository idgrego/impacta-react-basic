import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as service from 'app/services/user.service'
import type { User } from "~/models/user";
import { useNavigate, useParams } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";
import FormButton from "~/components/form-button";
import FormFrame from "~/components/form-frame";
import Icon, { IconType } from "~/components/icon";

export default function UserDeletePage() {
    const [errorForm, setErrorForm] = useState('');
    const [user, setUser] = React.useState<User | null>(null)
    const navigate = useNavigate()
    const { id } = useParams();


    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        service.del(Number(id))
            .then((data: boolean) => navigate('/users'))
            .catch(err => {
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }

    React.useEffect(() => {
        if (!id) return; // Garante que o ID existe antes de fazer a chamada

        service.get(Number(id))
            .then((data: User) => setUser(data))
            .catch(err => {
                setUser(null)
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }, [])

    if (!user) {
        return <p className="text-red-500 text-sm mt-1">User not found</p>
    }

    return (
        <FormFrame title="Delete user" onCloseNavTo="/users">
            <form onSubmit={submit} className="space-y-4">
                <InputField id="name" name="name" placeholder="Name" readOnly value={user.name} />
                <InputField id="username" name="username" placeholder="Username" readOnly value={user.username} />

                {errorForm && <p className="text-red-500 text-sm mt-1">{errorForm}</p>}

                <div className="flex justify-end gap-4 pt-4">
                    <FormButton type="submit">
                        <Icon type={IconType.Delete}></Icon> Delete
                    </FormButton>
                </div>
            </form>
        </FormFrame>
    );
}