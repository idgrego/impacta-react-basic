import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as service from 'app/services/role.service'
import type { Role } from "~/models/role";
import { useNavigate } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";
import FormButton from "~/components/form-button";
import Icon, { IconType } from "~/components/icon";
import FormFrame from "~/components/form-frame";

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
        <FormFrame title="Create role" onCloseNavTo="/roles">
            <form onSubmit={submit} className="space-y-4">
                <InputField id="name" name="name" placeholder="Name" required />
                <InputField id="description" name="description" required placeholder="Description" />

                {errorForm && <p className="text-red-500 text-sm mt-1">{errorForm}</p>}

                <div className="flex justify-end gap-4 pt-4">
                    <FormButton type="reset">
                        <Icon type={IconType.Reset}></Icon> Reset
                    </FormButton>
                    <FormButton type="submit">
                        <Icon type={IconType.Add}></Icon> Create
                    </FormButton>
                </div>
            </form>
        </FormFrame>
    );
}