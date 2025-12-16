import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as service from 'app/services/role.service'
import type { Role } from "~/models/role";
import { useNavigate, useParams } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";
import Icon, { IconType } from "~/components/icon";
import FormButton from "~/components/form-button";
import FormFrame from "~/components/form-frame";

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
        <FormFrame title="Edit role" onCloseNavTo="/roles">
            <form onSubmit={submit} className="space-y-4">
                <InputField id="name" name="name" placeholder="Name" readOnly value={role.name} />
                <InputField id="description" name="description" placeholder="Description" required value={role.description} onChange={handleUserChange} />

                {errorForm && <p className="text-red-500 text-sm mt-1">{errorForm}</p>}

                <div className="flex justify-end gap-4 pt-4">
                    <FormButton type="button" onClick={handleReset}>
                        <Icon type={IconType.Reset}></Icon> Reset
                    </FormButton>
                    <FormButton type="submit">
                        <Icon type={IconType.Edit}></Icon> Update
                    </FormButton>
                </div>
            </form>
        </FormFrame>
    );
}