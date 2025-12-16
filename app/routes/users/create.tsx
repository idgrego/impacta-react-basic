import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as userService from 'app/services/user.service'
import * as roleService from 'app/services/role.service'
import type { User } from "~/models/user";
import { useNavigate } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";
import FormButton from "~/components/form-button";
import Icon, { IconType } from "~/components/icon";
import FormFrame from "~/components/form-frame";
import type { Role } from "~/models/role";

export default function UserCreatePage() {
    const [roles, setRoles] = React.useState<Role[]>([])
    const [errorField, setErrorField] = useState('');
    const [errorForm, setErrorForm] = useState('');
    const navigate = useNavigate()

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorForm('')

        const formData = new FormData(e.currentTarget);

        const password = formData.get("password");
        const confirm = formData.get("confirm");
        if (password != confirm) {
            setErrorField("As senhas não conferem.");
            return
        }

        const name = formData.get("name");
        const username = formData.get("username");
        const selectedRoles = formData.getAll("roles").map(roleId => roles.find(r => r.id === Number(roleId))?.name);

        setErrorField(''); // Limpa o erro se as senhas forem iguais

        userService.create({ name, username, password, roles: selectedRoles } as User)
            .then((data: User) => navigate('/users'))
            .catch(err => {
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }

    function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
        // Limpa o erro assim que o usuário começa a digitar novamente
        setErrorField('');
    }

    React.useEffect(() => {
        roleService.list()
            .then((data: Role[]) => setRoles(data))
            .catch(err => {
                setRoles([])
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }, [])

    return (
        <FormFrame title="Create user" onCloseNavTo="/users">
            <form onSubmit={submit} className="space-y-4">
                <div className="flex">

                    <div id="users-fields" className="max-w-[50%] px-3">
                        <InputField id="name" name="name" placeholder="Name" required />
                        <InputField id="username" name="username" placeholder="Username" required />
                        <InputField id="password" name="password" placeholder="Password" required type="password" />
                        <div>
                            <InputField id="confirm" name="confirm" placeholder="Confirm password" required type="password" onChange={handleConfirmChange} />
                            {errorField && <p className="text-red-500 text-sm mt-1">{errorField}</p>}
                        </div>
                    </div>

                    <div id="users-roles" className="list-container max-w-[50%] px-3 w-full">
                        {
                            roles?.map((u: Role, idx: number) => {
                                return (
                                    <div key={u.id} className="flex items-center mb-2">
                                        <input type="checkbox" name="roles" defaultValue={u.id} className="mx-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                                        <div className="flex flex-col">
                                            <span className="text-lg font-semibold text-gray-900">{u.name}</span><span className="text-sm text-gray-500 -mt-1">{u.description}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

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