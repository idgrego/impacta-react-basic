import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as service from 'app/services/role.service'
import type { Role } from "~/models/role";
import { useNavigate, useParams } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";
import FormButton from "~/components/form-button";
import Icon, { IconType } from "~/components/icon";
import FormFrame from "~/components/form-frame";

export default function RoleDeletePage() {
    const [errorForm, setErrorForm] = useState('');
    const [role, setUser] = React.useState<Role | null>(null)
    const navigate = useNavigate()
    const { id } = useParams();


    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        service.del(Number(id))
            .then((data: boolean) => navigate('/roles'))
            .catch(err => {
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }

    React.useEffect(() => {
        if (!id) return; // Garante que o ID existe antes de fazer a chamada

        service.get(Number(id))
            .then((data: Role) => setUser(data))
            .catch(err => {
                setUser(null)
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }, [])

    if (!role) {
        return <p className="text-red-500 text-sm mt-1">Role not found</p>
    }

    return (
        <FormFrame title="Delete role" onCloseNavTo="/roles">
            <form onSubmit={submit} className="space-y-4">
                <InputField id="name" name="name" placeholder="Name" readOnly value={role.name} />
                <InputField id="description" name="description" placeholder="Description" readOnly value={role.description} />

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