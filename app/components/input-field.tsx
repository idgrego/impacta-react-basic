import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    custom?: string // coloquei só de exemplo
}

export default function InputField({ custom, ...inputProps }: Props) {
    return (
        <input {...inputProps} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    );
}

/* 
Essa forma também serve. A forma de cima é um reaproveitamento do que já existe.
A interface InputHTMLAttributes já contém todas as propriedades do INPUT.

====

type Props = {
    placeholder: string,
    type?: string,
}

export default function InputField(props: Props) {
    return (
        <div>
            <input
                type={props.type || 'text'}
                placeholder={props.placeholder}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
} */