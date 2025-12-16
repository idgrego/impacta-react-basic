import React, { useState } from "react";
import InputField from "~/components/input-field"
import * as userService from 'app/services/user.service'
import * as roleService from 'app/services/role.service'
import type { User } from "~/models/user";
import { useNavigate, useParams } from "react-router";
import LoginIsRequiredError from "~/exceptions/LoginIsRequiredError";
import type { Role } from "~/models/role";
import FormButton from "~/components/form-button";
import Icon, { IconType } from "~/components/icon";
import FormFrame from "~/components/form-frame";

export default function UserEditPage() {
    const [errorField, setErrorField] = useState('');
    const [errorForm, setErrorForm] = useState('');
    const [roles, setRoles] = React.useState<Role[]>([])
    const [user, setUser] = React.useState<User | null>(null)
    const [originalUser, setOriginalUser] = React.useState<User | null>(null)
    const [originalRoles, setOriginalRoles] = React.useState<Role[] | null>(null)
    const navigate = useNavigate()
    const { id } = useParams();

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorForm('')

        const formData = new FormData(e.currentTarget);

        let password = formData.get("password");
        const confirm = formData.get("confirm");
        if (password !== confirm) {
            setErrorField("As senhas não conferem.");
            return
        }

        const name = formData.get("name");
        const username = formData.get("username");
        const selectedRoles = formData.getAll("roles").map(roleId => roles.find(r => r.id === Number(roleId))?.name);

        setErrorField(''); // Limpa o erro se as senhas forem iguais

        // password é opcional. se não estiver preenchido utiliza o original
        if (!password) password = user?.password || ''

        userService.edit({ id: Number(id), name, username, password, roles: selectedRoles } as User)
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

    function handleUserChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (user) {
            setUser({ ...user, [name]: value });
        }
    }

    function handleRoleChange(roleId: number) {
        setRoles(prevRoles =>
            prevRoles.map(role =>
                role.id === roleId ? { ...role, isAssigned: !role.isAssigned } : role
            )
        );
    }

    function handleReset() {
        if (originalUser) {
            setUser(originalUser);
        }
        // Recria o estado dos roles a partir da cópia original, disparando a re-renderização
        if (originalRoles) {
            setRoles(JSON.parse(JSON.stringify(originalRoles)));
        }
    }

    React.useEffect(() => {
        if (!id) return; // Garante que o ID existe antes de fazer a chamada

        Promise.all([
            userService.get(Number(id)),
            roleService.list()])
            .then((data: [User, Role[]]) => {

                // inicializa
                data[1].forEach(roleObj => roleObj.isAssigned = false);

                // atualiza
                data[0].roles?.forEach(roleName => {
                    const roleObj = data[1].find(i => i.name == roleName)
                    if (roleObj) roleObj.isAssigned = true
                });

                setRoles(data[1]);
                // Usamos JSON.parse/stringify para uma cópia profunda e segura do estado inicial
                setOriginalRoles(JSON.parse(JSON.stringify(data[1])));

                setUser(data[0]);
                setOriginalUser(data[0]);
            })
            .catch(err => {
                setRoles([]);
                setUser(null)
                if (err instanceof LoginIsRequiredError || err.status === 401) navigate('/')
                else setErrorForm(`${err.status} | ${err.message}`)
            })
    }, [])

    if (!user) {
        return <p className="text-red-500 text-sm mt-1">User not found</p>
    }

    return (
        <FormFrame title="Edit user" onCloseNavTo="/users">
            <form onSubmit={submit} className="space-y-4">
                <div className="flex">

                    <div id="users-fields" className="max-w-[50%] px-3">
                        <InputField id="name" name="name" placeholder="Name" required value={user.name} onChange={handleUserChange} />
                        <InputField id="username" name="username" placeholder="Username" required value={user.username} onChange={handleUserChange} />
                        <InputField id="password" name="password" placeholder="Password" type="password" />
                        <div>
                            <InputField id="confirm" name="confirm" placeholder="Confirm password" type="password" onChange={handleConfirmChange} />
                            {errorField && <p className="text-red-500 text-sm mt-1">{errorField}</p>}
                        </div>
                        <p id="password-note" className="text-sm text-gray-500 mt-1">Note: the "password" and "confirm" fields should only be filled in if you want to change your password; otherwise, leave them blank.</p>
                    </div>

                    <div id="users-roles" className="max-w-[50%] px-3">
                        {
                            roles?.map((u: Role, idx: number) => {

                                return (
                                    <div key={u.id} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            name="roles"
                                            value={u.id}
                                            checked={u.isAssigned || false}
                                            onChange={() => handleRoleChange(u.id!)}
                                            className="mx-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                        />
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